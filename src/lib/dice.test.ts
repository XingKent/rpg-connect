import { describe, it, expect } from 'vitest';
import {
  rollDie,
  DICE_TYPES,
  classifyRoll,
  computeRollTotal,
  rollMultiple,
  computeMultiRollTotal,
  DICE_COUNT_MIN,
  DICE_COUNT_MAX,
} from '@/lib/dice';

describe('rollDie', () => {
  it('always returns an integer within [1, sides] for every supported die', () => {
    for (const sides of DICE_TYPES) {
      for (let i = 0; i < 200; i++) {
        const result = rollDie(sides);
        expect(Number.isInteger(result)).toBe(true);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(sides);
      }
    }
  });

  it('eventually produces both the minimum and maximum face on a small die', () => {
    const results = new Set<number>();
    for (let i = 0; i < 500; i++) {
      results.add(rollDie(4));
    }
    expect(results.has(1)).toBe(true);
    expect(results.has(4)).toBe(true);
  });
});

describe('classifyRoll', () => {
  it('classifies a natural 1 as a fumble regardless of die size', () => {
    expect(classifyRoll(1, 20)).toBe('fumble');
    expect(classifyRoll(1, 4)).toBe('fumble');
    expect(classifyRoll(1, 1000)).toBe('fumble');
  });

  it('classifies a natural max as a critical regardless of die size', () => {
    expect(classifyRoll(20, 20)).toBe('critical');
    expect(classifyRoll(4, 4)).toBe('critical');
    expect(classifyRoll(1000, 1000)).toBe('critical');
  });

  it('classifies anything in between as normal', () => {
    expect(classifyRoll(10, 20)).toBe('normal');
    expect(classifyRoll(2, 4)).toBe('normal');
  });

  it('a two-sided die roll is either a fumble or a critical, never normal', () => {
    expect(classifyRoll(1, 2)).toBe('fumble');
    expect(classifyRoll(2, 2)).toBe('critical');
  });
});

describe('computeRollTotal', () => {
  it('adds the modifier on a normal roll', () => {
    expect(computeRollTotal(10, 20, 5)).toBe(15);
    expect(computeRollTotal(10, 20, -3)).toBe(7);
  });

  it('ignores the modifier on a fumble (natural 1 always fails)', () => {
    expect(computeRollTotal(1, 20, 10)).toBe(1);
  });

  it('ignores the modifier on a critical (natural max always succeeds)', () => {
    expect(computeRollTotal(20, 20, -10)).toBe(20);
  });
});

describe('rollMultiple', () => {
  it('returns exactly `count` results, each within [1, sides]', () => {
    const rolls = rollMultiple(6, 4);
    expect(rolls).toHaveLength(4);
    for (const r of rolls) {
      expect(r).toBeGreaterThanOrEqual(1);
      expect(r).toBeLessThanOrEqual(6);
    }
  });

  it('returns a single result when count is 1', () => {
    expect(rollMultiple(20, 1)).toHaveLength(1);
  });

  it('clamps count below DICE_COUNT_MIN up to the minimum', () => {
    expect(rollMultiple(20, 0)).toHaveLength(DICE_COUNT_MIN);
    expect(rollMultiple(20, -5)).toHaveLength(DICE_COUNT_MIN);
  });

  it('clamps count above DICE_COUNT_MAX down to the maximum', () => {
    expect(rollMultiple(20, 999)).toHaveLength(DICE_COUNT_MAX);
  });
});

describe('computeMultiRollTotal', () => {
  it('behaves exactly like computeRollTotal for a single die', () => {
    expect(computeMultiRollTotal([10], 20, 5)).toBe(computeRollTotal(10, 20, 5));
    expect(computeMultiRollTotal([1], 20, 10)).toBe(computeRollTotal(1, 20, 10));
    expect(computeMultiRollTotal([20], 20, -10)).toBe(computeRollTotal(20, 20, -10));
  });

  it('sums every die plus the modifier once for multiple dice', () => {
    expect(computeMultiRollTotal([3, 5], 6, 2)).toBe(10);
    expect(computeMultiRollTotal([1, 20, 10], 20, 0)).toBe(31);
  });

  it('does not special-case natural 1s or maxes when rolling more than one die', () => {
    // Two d20s, one a nat 1 and one a nat 20 - unlike a single-die check, both just add up.
    expect(computeMultiRollTotal([1, 20], 20, 0)).toBe(21);
  });
});
