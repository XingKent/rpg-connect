import { describe, it, expect } from 'vitest';
import type { Build } from '@/types/bg3';
import { DEFAULT_SCORES } from '@/features/build-planner/lib/pointBuy';
import { finalScores, baseArmorClass } from '@/features/build-planner/lib/buildCalculations';

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

  it('reads ability bonuses from equipment stats entries (e.g. the arcane staff)', () => {
    const build = makeBuild({
      raceId: 'human',
      abilityScores: { ...DEFAULT_SCORES, int: 14 },
      equipmentIds: ['staff-of-spellpower'],
    });
    // Human +1 INT -> 15, staff adds +1 INT via its stats array -> 16
    expect(finalScores(build).int).toBe(16);
  });

  it('applies the chosen abilities for feats with an ability-choice sub-step', () => {
    const build = makeBuild({
      raceId: 'human',
      abilityScores: { ...DEFAULT_SCORES, str: 14, dex: 14 },
      featIds: ['ability-improvement'],
      featAbilityChoices: { 'ability-improvement': ['str', 'dex'] },
    });
    const scores = finalScores(build);
    // Human +1 to everything, plus +1 STR and +1 DEX chosen from the feat
    expect(scores.str).toBe(16);
    expect(scores.dex).toBe(16);
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
});
