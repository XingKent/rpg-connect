import { describe, it, expect, beforeEach } from 'vitest';
import { useBuildStore, FEAT_LIMIT } from '@/store/buildStore';

function resetStore() {
  useBuildStore.getState().resetDraft();
}

describe('buildStore', () => {
  beforeEach(() => {
    resetStore();
  });

  it('caps feat selection at FEAT_LIMIT', () => {
    const { toggleFeat } = useBuildStore.getState();
    toggleFeat('tavern-brawler');
    toggleFeat('alert');
    toggleFeat('great-weapon-master');
    toggleFeat('sharpshooter'); // should be ignored, limit reached
    expect(useBuildStore.getState().draft.featIds).toHaveLength(FEAT_LIMIT);
    expect(useBuildStore.getState().draft.featIds).not.toContain('sharpshooter');
  });

  it('allows deselecting a feat even at the cap', () => {
    const { toggleFeat } = useBuildStore.getState();
    toggleFeat('tavern-brawler');
    toggleFeat('alert');
    toggleFeat('great-weapon-master');
    toggleFeat('tavern-brawler'); // deselect
    expect(useBuildStore.getState().draft.featIds).toHaveLength(2);
    expect(useBuildStore.getState().draft.featIds).not.toContain('tavern-brawler');
  });

  it('resets subclass when a new class is chosen', () => {
    const { setClass, setSubclass } = useBuildStore.getState();
    setClass('druid');
    setSubclass('circle-of-the-moon');
    expect(useBuildStore.getState().draft.subclassId).toBe('circle-of-the-moon');
    setClass('wizard');
    expect(useBuildStore.getState().draft.subclassId).toBeUndefined();
  });

  it('applies a recommended ability distribution when a class is chosen', () => {
    const { setClass } = useBuildStore.getState();
    setClass('wizard'); // primary ability: int
    expect(useBuildStore.getState().draft.abilityScores.int).toBe(15);
  });

  it('clears equipment, feats and spells independently', () => {
    const { toggleFeat, toggleSpell, toggleEquipment, clearFeats, clearSpells, clearEquipment, setClass } =
      useBuildStore.getState();
    setClass('druid');
    toggleFeat('alert');
    toggleSpell('shillelagh');
    toggleEquipment('cloak-of-protection');

    clearFeats();
    clearSpells();
    clearEquipment();

    const draft = useBuildStore.getState().draft;
    expect(draft.featIds).toHaveLength(0);
    expect(draft.spellIds).toHaveLength(0);
    expect(draft.equipmentIds).toHaveLength(0);
  });
});
