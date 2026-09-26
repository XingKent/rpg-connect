import { describe, it, expect } from 'vitest';
import { rollPerceptionCheck, PERCEPTION_DC } from '@/lib/perceptionCheck';

describe('rollPerceptionCheck', () => {
  it('always returns a roll between 1 and 20', () => {
    for (let i = 0; i < 300; i++) {
      const outcome = rollPerceptionCheck();
      expect(outcome.roll).toBeGreaterThanOrEqual(1);
      expect(outcome.roll).toBeLessThanOrEqual(20);
    }
  });

  it('classifies every roll consistently with the DC and natural extremes', () => {
    for (let i = 0; i < 500; i++) {
      const outcome = rollPerceptionCheck();
      if (outcome.roll === 20) {
        expect(outcome.result).toBe('critical');
      } else if (outcome.roll === 1) {
        expect(outcome.result).toBe('fail');
      } else if (outcome.roll >= PERCEPTION_DC) {
        expect(outcome.result).toBe('success');
      } else {
        expect(outcome.result).toBe('fail');
      }
    }
  });

  it('eventually produces a critical (natural 20) and a fail (low roll)', () => {
    const results = new Set<string>();
    for (let i = 0; i < 500; i++) {
      results.add(rollPerceptionCheck().result);
    }
    expect(results.has('critical')).toBe(true);
    expect(results.has('fail')).toBe(true);
  });
});
