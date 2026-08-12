import { describe, it, expect, beforeEach } from 'vitest';
import { useBuildStore } from '@/features/build-planner/store/buildStore';
import { featSlotsForLevel } from '@/features/build-planner/lib/level';

function resetStore() {
  useBuildStore.getState().resetDraft();
}

describe('buildStore', () => {
  beforeEach(() => {
    resetStore();
  });

  it('defaults new drafts to level 12 (3 feat slots)', () => {
    expect(useBuildStore.getState().draft.level).toBe(12);
    expect(featSlotsForLevel(useBuildStore.getState().draft.level)).toBe(3);
  });

  it('caps feat selection at the level-based limit', () => {
    const { toggleFeat } = useBuildStore.getState();
    toggleFeat('tavern-brawler');
    toggleFeat('alert');
    toggleFeat('great-weapon-master');
    toggleFeat('sharpshooter'); // should be ignored, limit reached at level 12 (3 slots)
    expect(useBuildStore.getState().draft.featIds).toHaveLength(3);
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

  it('lowering the level trims feats beyond the new slot count', () => {
    const { toggleFeat, setLevel } = useBuildStore.getState();
    toggleFeat('tavern-brawler');
    toggleFeat('alert');
    toggleFeat('great-weapon-master');
    expect(useBuildStore.getState().draft.featIds).toHaveLength(3);

    setLevel(4); // only 1 feat slot at level 4
    expect(useBuildStore.getState().draft.featIds).toHaveLength(1);
  });

  it('lowering the level drops spells above the new max spell level', () => {
    const { setClass, toggleSpell, setLevel } = useBuildStore.getState();
    setClass('wizard');
    toggleSpell('fireball'); // level 3 spell, needs character level 5+
    expect(useBuildStore.getState().draft.spellIds).toContain('fireball');

    setLevel(2); // max spell level becomes 1
    expect(useBuildStore.getState().draft.spellIds).not.toContain('fireball');
  });

  it('clears the ability-choice picks when the granting feat is deselected', () => {
    const { toggleFeat, toggleFeatAbilityChoice } = useBuildStore.getState();
    toggleFeat('ability-improvement');
    toggleFeatAbilityChoice('ability-improvement', 'str');
    toggleFeatAbilityChoice('ability-improvement', 'dex');
    expect(useBuildStore.getState().draft.featAbilityChoices['ability-improvement']).toEqual(['str', 'dex']);

    toggleFeat('ability-improvement'); // deselect
    expect(useBuildStore.getState().draft.featAbilityChoices['ability-improvement']).toBeUndefined();
  });

  it('caps ability-choice picks at the feat-defined number', () => {
    const { toggleFeat, toggleFeatAbilityChoice } = useBuildStore.getState();
    toggleFeat('ability-improvement'); // picks: 2
    toggleFeatAbilityChoice('ability-improvement', 'str');
    toggleFeatAbilityChoice('ability-improvement', 'dex');
    toggleFeatAbilityChoice('ability-improvement', 'con'); // ignored, already at 2 picks
    expect(useBuildStore.getState().draft.featAbilityChoices['ability-improvement']).toEqual(['str', 'dex']);
  });
});
