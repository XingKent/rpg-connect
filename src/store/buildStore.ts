import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AbilityKey, AbilityScores, Build } from '@/types/bg3';
import { classes } from '@/data/classes';
import { DEFAULT_SCORES, canDecrease, canIncrease, recommendedDistribution } from '@/lib/pointBuy';

export const FEAT_LIMIT = 3;

function emptyDraft(): Build {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    name: '',
    raceId: '',
    subraceId: undefined,
    classId: '',
    subclassId: undefined,
    abilityScores: { ...DEFAULT_SCORES },
    featIds: [],
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
          if (!has && s.draft.featIds.length >= FEAT_LIMIT) return s;
          const featIds = has ? s.draft.featIds.filter((f) => f !== featId) : [...s.draft.featIds, featId];
          return { draft: { ...s.draft, featIds, ...touch() } };
        }),

      clearFeats: () => set((s) => ({ draft: { ...s.draft, featIds: [], ...touch() } })),

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
          const equipmentIds = has
            ? s.draft.equipmentIds.filter((e) => e !== equipmentId)
            : [...s.draft.equipmentIds, equipmentId];
          return { draft: { ...s.draft, equipmentIds, ...touch() } };
        }),

      clearEquipment: () => set((s) => ({ draft: { ...s.draft, equipmentIds: [], ...touch() } })),

      resetDraft: () => set({ draft: emptyDraft() }),

      loadDraft: (build) => set({ draft: { ...build } }),

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
    }
  )
);
