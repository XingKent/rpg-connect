import { describe, it, expect } from 'vitest';
import { rollDie, DICE_TYPES, classifyRoll, computeRollTotal } from '@/lib/dice';

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
