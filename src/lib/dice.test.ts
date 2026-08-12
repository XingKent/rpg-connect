import { describe, it, expect } from 'vitest';
import { rollDie, DICE_TYPES } from '@/lib/dice';

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
