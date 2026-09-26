import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AchievementStoreState {
  checked: Record<string, boolean>;
  toggle: (id: string) => void;
  /** Marks an achievement as done unconditionally. Unlike toggle, calling this again never un-checks it. */
  unlock: (id: string) => void;
  resetAll: () => void;
}

export const useAchievementStore = create<AchievementStoreState>()(
  persist(
    (set) => ({
      checked: {},

      toggle: (id) =>
        set((s) => ({
          checked: { ...s.checked, [id]: !s.checked[id] },
        })),

      unlock: (id) => set((s) => (s.checked[id] ? s : { checked: { ...s.checked, [id]: true } })),

      resetAll: () => set({ checked: {} }),
    }),
    {
      name: 'bg3-achievement-tracker-storage',
    }
  )
);
