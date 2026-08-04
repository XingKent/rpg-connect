import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AbilityKey, AbilityScores, Build } from '@/types/bg3';
import { DEFAULT_SCORES, canDecrease, canIncrease } from '@/lib/pointBuy';

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
  setClass: (classId: string, subclassId?: string) => void;
  increaseAbility: (key: AbilityKey) => void;
  decreaseAbility: (key: AbilityKey) => void;
  toggleFeat: (featId: string) => void;
  toggleSpell: (spellId: string) => void;
  toggleEquipment: (equipmentId: string) => void;
  resetDraft: () => void;
  loadDraft: (build: Build) => void;
  saveDraft: () => Build;
  deleteBuild: (id: string) => void;
}

export const useBuildStore = create<BuildStoreState>()(
  persist(
    (set, get) => ({
      draft: emptyDraft(),
      savedBuilds: [],

      setName: (name) => set((s) => ({ draft: { ...s.draft, name, updatedAt: new Date().toISOString() } })),

      setRace: (raceId, subraceId) =>
        set((s) => ({ draft: { ...s.draft, raceId, subraceId, updatedAt: new Date().toISOString() } })),

      setClass: (classId, subclassId) =>
        set((s) => ({ draft: { ...s.draft, classId, subclassId, updatedAt: new Date().toISOString() } })),

      increaseAbility: (key) =>
        set((s) => {
          if (!canIncrease(s.draft.abilityScores, key)) return s;
          const abilityScores: AbilityScores = {
            ...s.draft.abilityScores,
            [key]: s.draft.abilityScores[key] + 1,
          };
          return { draft: { ...s.draft, abilityScores, updatedAt: new Date().toISOString() } };
        }),

      decreaseAbility: (key) =>
        set((s) => {
          if (!canDecrease(s.draft.abilityScores, key)) return s;
          const abilityScores: AbilityScores = {
            ...s.draft.abilityScores,
            [key]: s.draft.abilityScores[key] - 1,
          };
          return { draft: { ...s.draft, abilityScores, updatedAt: new Date().toISOString() } };
        }),

      toggleFeat: (featId) =>
        set((s) => {
          const has = s.draft.featIds.includes(featId);
          const featIds = has ? s.draft.featIds.filter((f) => f !== featId) : [...s.draft.featIds, featId];
          return { draft: { ...s.draft, featIds, updatedAt: new Date().toISOString() } };
        }),

      toggleSpell: (spellId) =>
        set((s) => {
          const has = s.draft.spellIds.includes(spellId);
          const spellIds = has
            ? s.draft.spellIds.filter((sp) => sp !== spellId)
            : [...s.draft.spellIds, spellId];
          return { draft: { ...s.draft, spellIds, updatedAt: new Date().toISOString() } };
        }),

      toggleEquipment: (equipmentId) =>
        set((s) => {
          const has = s.draft.equipmentIds.includes(equipmentId);
          const equipmentIds = has
            ? s.draft.equipmentIds.filter((e) => e !== equipmentId)
            : [...s.draft.equipmentIds, equipmentId];
          return { draft: { ...s.draft, equipmentIds, updatedAt: new Date().toISOString() } };
        }),

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
