import { describe, it, expect } from 'vitest';
import type { Build } from '@/types/bg3';
import { DEFAULT_SCORES } from '@/features/build-planner/lib/pointBuy';
import {
  finalScores,
  baseArmorClass,
  hasIncompleteFeatChoices,
  buildCompleteness,
} from '@/features/build-planner/lib/buildCalculations';

function makeBuild(overrides: Partial<Build> = {}): Build {
  const now = new Date().toISOString();
  return {
    id: 'test-id',
    name: 'Test Build',
    level: 12,
    raceId: 'wood-elf',
    subraceId: 'wood-elf-sub',
    classId: 'druid',
    subclassId: 'circle-of-the-moon',
    abilityScores: { ...DEFAULT_SCORES },
    featIds: [],
    featAbilityChoices: {},
    spellIds: [],
    equipmentIds: [],
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

describe('buildCalculations', () => {
  it('applies racial bonuses on top of base ability scores', () => {
    const build = makeBuild({ abilityScores: { ...DEFAULT_SCORES, dex: 15, wis: 15 } });
    const scores = finalScores(build);
    // Wood Elf: +2 DEX base, subrace +1 WIS
    expect(scores.dex).toBe(17);
    expect(scores.wis).toBe(16);
  });

  it('stacks feat ability bonuses on top of racial bonuses', () => {
    const build = makeBuild({
      raceId: 'half-orc',
      subraceId: undefined,
      abilityScores: { ...DEFAULT_SCORES, str: 15 },
      featIds: ['tavern-brawler'],
    });
    const scores = finalScores(build);
    // Half-Orc +2 STR, Tavern Brawler +1 STR
    expect(scores.str).toBe(18);
  });

  it('adds equipment armor class bonuses to base 10 + DEX modifier', () => {
    const build = makeBuild({
      raceId: 'human',
      abilityScores: { ...DEFAULT_SCORES, dex: 14 },
      equipmentIds: ['cloak-of-protection'],
    });
    // Human +1 DEX -> 15 total -> mod +2. Base 10 + 2 + cloak's +1 AC = 13
    expect(baseArmorClass(build)).toBe(13);
  });

  it('stacks armor-class stats from multiple equipped items', () => {
    const build = makeBuild({
      raceId: 'human',
      abilityScores: { ...DEFAULT_SCORES, dex: 8 },
      equipmentIds: ['cloak-of-protection', 'ring-of-protection'],
    });
    // Human +1 DEX -> 9 total -> mod -1. Base 10 - 1 + 1 (cloak) + 1 (ring) = 11
    expect(baseArmorClass(build)).toBe(11);
  });

  it('reads ability bonuses from equipment stats entries (e.g. the headband of intellect)', () => {
    const build = makeBuild({
      raceId: 'human',
      abilityScores: { ...DEFAULT_SCORES, int: 14 },
      equipmentIds: ['headband-of-intellect'],
    });
    // Human +1 INT -> 15, headband adds +2 INT via its stats array -> 17
    expect(finalScores(build).int).toBe(17);
  });

  it('applies the chosen abilities for feats with an ability-choice sub-step', () => {
    const build = makeBuild({
      raceId: 'human',
      abilityScores: { ...DEFAULT_SCORES, str: 14, dex: 14 },
      featIds: ['ability-improvement'],
      featAbilityChoices: { 'ability-improvement': { str: 1, dex: 1 } },
    });
    const scores = finalScores(build);
    // Human +1 to everything, plus +1 STR and +1 DEX chosen from the feat
    expect(scores.str).toBe(16);
    expect(scores.dex).toBe(16);
  });

  it('allows stacking more than one point on the same ability', () => {
    const build = makeBuild({
      raceId: 'human',
      abilityScores: { ...DEFAULT_SCORES, str: 14 },
      featIds: ['ability-improvement'],
      featAbilityChoices: { 'ability-improvement': { str: 2 } },
    });
    // Human +1 STR, plus 2 points x +1 each from the feat = +2
    expect(finalScores(build).str).toBe(17);
  });

  it('ignores an ability-choice feat with no choices made yet', () => {
    const build = makeBuild({
      raceId: 'human',
      abilityScores: { ...DEFAULT_SCORES, str: 14 },
      featIds: ['ability-improvement'],
      featAbilityChoices: {},
    });
    expect(finalScores(build).str).toBe(15); // only the +1 racial bonus
  });

  describe('baseArmorClass with actual armor equipped', () => {
    it('heavy armor uses its flat base AC and ignores Dexterity entirely', () => {
      const build = makeBuild({
        raceId: 'human',
        abilityScores: { ...DEFAULT_SCORES, dex: 18 }, // huge DEX mod, should not matter
        equipmentIds: ['adamantine-splint-armor'],
      });
      // Heavy armor base AC 17, no Dex contribution, no flat stats on this item
      expect(baseArmorClass(build)).toBe(17);
    });

    it('medium armor caps the Dexterity contribution at +2', () => {
      const build = makeBuild({
        raceId: 'human',
        abilityScores: { ...DEFAULT_SCORES, dex: 18 }, // human +1 -> 19 -> mod +4, should cap at +2
        equipmentIds: ['half-plate-armor'],
      });
      // Base 15 + capped Dex (+2) = 17
      expect(baseArmorClass(build)).toBe(17);
    });

    it('light armor adds the full Dexterity modifier', () => {
      const build = makeBuild({
        raceId: 'human',
        abilityScores: { ...DEFAULT_SCORES, dex: 14 }, // human +1 -> 15 -> mod +2
        equipmentIds: ['studded-leather-armor'],
      });
      // Base 12 + full Dex (+2) = 14
      expect(baseArmorClass(build)).toBe(14);
    });

    it('stacks flat AC accessories (rings/cloaks) on top of worn armor', () => {
      const build = makeBuild({
        raceId: 'human',
        abilityScores: { ...DEFAULT_SCORES, dex: 8 },
        equipmentIds: ['adamantine-splint-armor', 'ring-of-protection', 'cloak-of-protection'],
      });
      // Heavy armor base 17 (no Dex) + ring +1 + cloak +1 = 19
      expect(baseArmorClass(build)).toBe(19);
    });
  });

  describe('hasIncompleteFeatChoices / buildCompleteness', () => {
    it('flags a build as incomplete when an ability-choice feat has fewer points allocated than required', () => {
      const build = makeBuild({
        featIds: ['ability-improvement'],
        featAbilityChoices: { 'ability-improvement': { str: 1 } }, // needs 2 points, only has 1
      });
      expect(hasIncompleteFeatChoices(build)).toBe(true);
      expect(buildCompleteness(build).feats).toBe(false);
    });

    it('considers the feats step complete once all points are allocated', () => {
      const build = makeBuild({
        featIds: ['ability-improvement'],
        featAbilityChoices: { 'ability-improvement': { str: 1, dex: 1 } },
      });
      expect(hasIncompleteFeatChoices(build)).toBe(false);
      expect(buildCompleteness(build).feats).toBe(true);
    });

    it('also completes when both points go into the same ability', () => {
      const build = makeBuild({
        featIds: ['ability-improvement'],
        featAbilityChoices: { 'ability-improvement': { str: 2 } },
      });
      expect(hasIncompleteFeatChoices(build)).toBe(false);
      expect(buildCompleteness(build).feats).toBe(true);
    });

    it('does not flag feats that have no ability choice at all', () => {
      const build = makeBuild({ featIds: ['alert'] });
      expect(hasIncompleteFeatChoices(build)).toBe(false);
      expect(buildCompleteness(build).feats).toBe(true);
    });
  });
});
