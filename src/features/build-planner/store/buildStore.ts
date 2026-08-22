import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AbilityKey, AbilityScores, Build } from '@/types/bg3';
import { EQUIPMENT_SLOT_CAPACITY } from '@/types/bg3';
import { classes } from '@/data/classes';
import { feats } from '@/data/feats';
import { spells } from '@/data/spells';
import { equipment } from '@/data/equipment';
import {
  DEFAULT_SCORES,
  canDecrease,
  canIncrease,
  recommendedDistribution,
} from '@/features/build-planner/lib/pointBuy';
import {
  clampLevel,
  featSlotsForLevel,
  maxSpellLevelForCharacterLevel,
} from '@/features/build-planner/lib/level';
import { normalizeBuild } from '@/features/build-planner/lib/normalizeBuild';

function emptyDraft(): Build {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    name: '',
    level: 12,
    raceId: '',
    subraceId: undefined,
    classId: '',
    subclassId: undefined,
    abilityScores: { ...DEFAULT_SCORES },
    featIds: [],
    featAbilityChoices: {},
    spellIds: [],
    equipmentIds: [],
    createdAt: now,
    updatedAt: now,
  };
}

interface BuildStoreState {
  draft: Build;
  savedBuilds: Build[];

  setName: (name: string) => void;
  setLevel: (level: number) => void;
  setRace: (raceId: string, subraceId?: string) => void;
  clearRace: () => void;
  setClass: (classId: string) => void;
  clearClass: () => void;
  setSubclass: (subclassId: string) => void;
  clearSubclass: () => void;
  increaseAbility: (key: AbilityKey) => void;
  decreaseAbility: (key: AbilityKey) => void;
  resetAbilities: () => void;
  applyRecommendedAbilities: () => void;
  toggleFeat: (featId: string) => void;
  clearFeats: () => void;
  toggleFeatAbilityChoice: (featId: string, ability: AbilityKey) => void;
  toggleSpell: (spellId: string) => void;
  clearSpells: () => void;
  toggleEquipment: (equipmentId: string) => void;
  clearEquipment: () => void;
  resetDraft: () => void;
  loadDraft: (build: Build) => void;
  saveDraft: () => Build;
  deleteBuild: (id: string) => void;
}

function touch(): Pick<Build, 'updatedAt'> {
  return { updatedAt: new Date().toISOString() };
}

export const useBuildStore = create<BuildStoreState>()(
  persist(
    (set, get) => ({
      draft: emptyDraft(),
      savedBuilds: [],

      setName: (name) => set((s) => ({ draft: { ...s.draft, name, ...touch() } })),

      setLevel: (level) =>
        set((s) => {
          const clamped = clampLevel(level);

          // Trim feats down to the new slot count (drop the most recently added first).
          const featLimit = featSlotsForLevel(clamped);
          const featIds = s.draft.featIds.slice(0, featLimit);
          const featAbilityChoices = Object.fromEntries(
            Object.entries(s.draft.featAbilityChoices).filter(([id]) => featIds.includes(id))
          );

          // Drop spells the character is no longer high-level enough to know.
          const maxSpellLevel = maxSpellLevelForCharacterLevel(clamped);
          const spellIds = s.draft.spellIds.filter((id) => {
            const spell = spells.find((sp) => sp.id === id);
            return spell ? spell.level <= maxSpellLevel : false;
          });

          // Unset the subclass if it's no longer available at the new level.
          const cls = classes.find((c) => c.id === s.draft.classId);
          const sub = cls?.subclasses.find((sc) => sc.id === s.draft.subclassId);
          const subclassId = sub && sub.levelAvailable > clamped ? undefined : s.draft.subclassId;

          return {
            draft: {
              ...s.draft,
              level: clamped,
              featIds,
              featAbilityChoices,
              spellIds,
              subclassId,
              ...touch(),
            },
          };
        }),

      setRace: (raceId, subraceId) => set((s) => ({ draft: { ...s.draft, raceId, subraceId, ...touch() } })),

      clearRace: () => set((s) => ({ draft: { ...s.draft, raceId: '', subraceId: undefined, ...touch() } })),

      setClass: (classId) =>
        set((s) => {
          const cls = classes.find((c) => c.id === classId);
          const abilityScores = cls ? recommendedDistribution(cls.primaryAbility) : s.draft.abilityScores;
          return {
            draft: { ...s.draft, classId, subclassId: undefined, abilityScores, ...touch() },
          };
        }),

      clearClass: () =>
        set((s) => ({ draft: { ...s.draft, classId: '', subclassId: undefined, ...touch() } })),

      setSubclass: (subclassId) => set((s) => ({ draft: { ...s.draft, subclassId, ...touch() } })),

      clearSubclass: () => set((s) => ({ draft: { ...s.draft, subclassId: undefined, ...touch() } })),

      increaseAbility: (key) =>
        set((s) => {
          if (!canIncrease(s.draft.abilityScores, key)) return s;
          const abilityScores: AbilityScores = {
            ...s.draft.abilityScores,
            [key]: s.draft.abilityScores[key] + 1,
          };
          return { draft: { ...s.draft, abilityScores, ...touch() } };
        }),

      decreaseAbility: (key) =>
        set((s) => {
          if (!canDecrease(s.draft.abilityScores, key)) return s;
          const abilityScores: AbilityScores = {
            ...s.draft.abilityScores,
            [key]: s.draft.abilityScores[key] - 1,
          };
          return { draft: { ...s.draft, abilityScores, ...touch() } };
        }),

      resetAbilities: () =>
        set((s) => ({ draft: { ...s.draft, abilityScores: { ...DEFAULT_SCORES }, ...touch() } })),

      applyRecommendedAbilities: () =>
        set((s) => {
          const cls = classes.find((c) => c.id === s.draft.classId);
          if (!cls) return s;
          return {
            draft: {
              ...s.draft,
              abilityScores: recommendedDistribution(cls.primaryAbility),
              ...touch(),
            },
          };
        }),

      toggleFeat: (featId) =>
        set((s) => {
          const has = s.draft.featIds.includes(featId);
          const limit = featSlotsForLevel(s.draft.level);
          if (!has && s.draft.featIds.length >= limit) return s;
          const featIds = has ? s.draft.featIds.filter((f) => f !== featId) : [...s.draft.featIds, featId];
          const featAbilityChoices = { ...s.draft.featAbilityChoices };
          if (has) delete featAbilityChoices[featId];
          return { draft: { ...s.draft, featIds, featAbilityChoices, ...touch() } };
        }),

      clearFeats: () =>
        set((s) => ({ draft: { ...s.draft, featIds: [], featAbilityChoices: {}, ...touch() } })),

      toggleFeatAbilityChoice: (featId, ability) =>
        set((s) => {
          const feat = feats.find((f) => f.id === featId);
          if (!feat?.abilityChoice) return s;
          const current = s.draft.featAbilityChoices[featId] ?? [];
          const has = current.includes(ability);
          let next: AbilityKey[];
          if (has) {
            next = current.filter((a) => a !== ability);
          } else {
            if (current.length >= feat.abilityChoice.picks) return s;
            next = [...current, ability];
          }
          return {
            draft: {
              ...s.draft,
              featAbilityChoices: { ...s.draft.featAbilityChoices, [featId]: next },
              ...touch(),
            },
          };
        }),

      toggleSpell: (spellId) =>
        set((s) => {
          const has = s.draft.spellIds.includes(spellId);
          const spellIds = has
            ? s.draft.spellIds.filter((sp) => sp !== spellId)
            : [...s.draft.spellIds, spellId];
          return { draft: { ...s.draft, spellIds, ...touch() } };
        }),

      clearSpells: () => set((s) => ({ draft: { ...s.draft, spellIds: [], ...touch() } })),

      toggleEquipment: (equipmentId) =>
        set((s) => {
          const has = s.draft.equipmentIds.includes(equipmentId);

          if (has) {
            return {
              draft: {
                ...s.draft,
                equipmentIds: s.draft.equipmentIds.filter((e) => e !== equipmentId),
                ...touch(),
              },
            };
          }

          const item = equipment.find((e) => e.id === equipmentId);
          if (!item) return s;

          const capacity = EQUIPMENT_SLOT_CAPACITY[item.slot];
          const sameSlotIds = s.draft.equipmentIds.filter(
            (id) => equipment.find((e) => e.id === id)?.slot === item.slot
          );

          let equipmentIds = s.draft.equipmentIds;
          if (sameSlotIds.length >= capacity) {
            // Slot is full: unequip the oldest item(s) of this slot to make room.
            const toDrop = sameSlotIds.slice(0, sameSlotIds.length - capacity + 1);
            equipmentIds = equipmentIds.filter((id) => !toDrop.includes(id));
          }

          return { draft: { ...s.draft, equipmentIds: [...equipmentIds, equipmentId], ...touch() } };
        }),

      clearEquipment: () => set((s) => ({ draft: { ...s.draft, equipmentIds: [], ...touch() } })),

      resetDraft: () => set({ draft: emptyDraft() }),

      loadDraft: (build) => set({ draft: normalizeBuild(build) }),

      saveDraft: () => {
        const state = get();
        const now = new Date().toISOString();
        const toSave: Build = { ...state.draft, updatedAt: now };
        const exists = state.savedBuilds.some((b) => b.id === toSave.id);
        const savedBuilds = exists
          ? state.savedBuilds.map((b) => (b.id === toSave.id ? toSave : b))
          : [...state.savedBuilds, toSave];
        set({ savedBuilds });
        return toSave;
      },

      deleteBuild: (id) => set((s) => ({ savedBuilds: s.savedBuilds.filter((b) => b.id !== id) })),
    }),
    {
      name: 'bg3-build-planner-storage',
      partialize: (s) => ({ savedBuilds: s.savedBuilds, draft: s.draft }),
      merge: (persistedState, currentState) => {
        const persisted = (persistedState ?? {}) as Partial<Pick<BuildStoreState, 'draft' | 'savedBuilds'>>;
        return {
          ...currentState,
          draft: persisted.draft ? normalizeBuild(persisted.draft) : currentState.draft,
          savedBuilds: Array.isArray(persisted.savedBuilds)
            ? persisted.savedBuilds.map(normalizeBuild)
            : currentState.savedBuilds,
        };
      },
    }
  )
);
