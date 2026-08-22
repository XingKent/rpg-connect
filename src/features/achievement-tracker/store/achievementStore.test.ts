import { describe, it, expect, beforeEach } from 'vitest';
import { useAchievementStore } from '@/features/achievement-tracker/store/achievementStore';

describe('achievementStore', () => {
  beforeEach(() => {
    useAchievementStore.getState().resetAll();
  });

  it('starts with nothing checked', () => {
    expect(useAchievementStore.getState().checked).toEqual({});
  });

  it('toggling an id marks it as checked', () => {
    useAchievementStore.getState().toggle('honour-mode');
    expect(useAchievementStore.getState().checked['honour-mode']).toBe(true);
  });

  it('toggling a checked id unchecks it again', () => {
    const { toggle } = useAchievementStore.getState();
    toggle('honour-mode');
    toggle('honour-mode');
    expect(useAchievementStore.getState().checked['honour-mode']).toBe(false);
  });

  it('tracks multiple achievements independently', () => {
    const { toggle } = useAchievementStore.getState();
    toggle('honour-mode');
    toggle('jack-of-all-trades');
    const checked = useAchievementStore.getState().checked;
    expect(checked['honour-mode']).toBe(true);
    expect(checked['jack-of-all-trades']).toBe(true);
    expect(checked['romance-karlach']).toBeUndefined();
  });

  it('resetAll clears every checked achievement', () => {
    const { toggle, resetAll } = useAchievementStore.getState();
    toggle('honour-mode');
    toggle('jack-of-all-trades');
    resetAll();
    expect(useAchievementStore.getState().checked).toEqual({});
  });
});
