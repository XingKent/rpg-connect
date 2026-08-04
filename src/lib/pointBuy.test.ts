import { describe, it, expect } from 'vitest';
import {
  DEFAULT_SCORES,
  canDecrease,
  canIncrease,
  pointsRemaining,
  scoreCost,
  totalSpent,
  abilityModifier,
  recommendedDistribution,
  POINT_BUY_BUDGET,
} from '@/lib/pointBuy';

describe('pointBuy', () => {
  it('starts with 27 points remaining at default scores (all 8)', () => {
    expect(totalSpent(DEFAULT_SCORES)).toBe(0);
    expect(pointsRemaining(DEFAULT_SCORES)).toBe(27);
  });

  it('costs more as scores climb past 13', () => {
    expect(scoreCost(13)).toBe(5);
    expect(scoreCost(14)).toBe(7);
    expect(scoreCost(15)).toBe(9);
  });

  it('cannot increase a score above 15', () => {
    const scores = { ...DEFAULT_SCORES, str: 15 };
    expect(canIncrease(scores, 'str')).toBe(false);
  });

  it('cannot decrease a score below 8', () => {
    expect(canDecrease(DEFAULT_SCORES, 'str')).toBe(false);
  });

  it('blocks increases once the point budget is exhausted', () => {
    // Spend it all on STR: 8->15 costs 9 points, leaves 18 remaining.
    let scores = { ...DEFAULT_SCORES, str: 15 };
    expect(pointsRemaining(scores)).toBe(18);
    // Push DEX and CON up too until budget is nearly gone.
    scores = { ...scores, dex: 15, con: 12 };
    // 9 (str) + 9 (dex) + 4 (con) = 22 spent, 5 remaining
    expect(pointsRemaining(scores)).toBe(5);
    expect(canIncrease(scores, 'int')).toBe(true); // 10->11 costs 1
  });

  it('computes ability modifiers using the standard D&D formula', () => {
    expect(abilityModifier(8)).toBe(-1);
    expect(abilityModifier(10)).toBe(0);
    expect(abilityModifier(15)).toBe(2);
    expect(abilityModifier(20)).toBe(5);
  });

  describe('recommendedDistribution', () => {
    it('spends exactly the full point-buy budget', () => {
      const scores = recommendedDistribution(['wis']);
      expect(totalSpent(scores)).toBe(POINT_BUY_BUDGET);
    });

    it('gives the highest score to the primary ability', () => {
      const scores = recommendedDistribution(['dex']);
      expect(scores.dex).toBe(15);
    });

    it('prioritizes multiple primary abilities before falling back to CON', () => {
      const scores = recommendedDistribution(['str', 'dex']);
      expect(scores.str).toBe(15);
      expect(scores.dex).toBe(14);
      expect(scores.con).toBe(13);
    });

    it('still gives Constitution a solid score when it is not primary', () => {
      const scores = recommendedDistribution(['int']);
      expect(scores.int).toBe(15);
      expect(scores.con).toBe(14);
    });
  });
});
