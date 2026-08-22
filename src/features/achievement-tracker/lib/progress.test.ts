import { describe, it, expect } from 'vitest';
import { computeProgress } from '@/features/achievement-tracker/lib/progress';
import type { Achievement } from '@/features/achievement-tracker/types';

const sample: Achievement[] = [
  { id: 'a1', name: 'A1', description: '', category: 'Prólogo' },
  { id: 'a2', name: 'A2', description: '', category: 'Prólogo' },
  { id: 'b1', name: 'B1', description: '', category: 'Companion' },
];

describe('computeProgress', () => {
  it('returns 0% when nothing is checked', () => {
    const progress = computeProgress(sample, {});
    expect(progress.done).toBe(0);
    expect(progress.total).toBe(3);
    expect(progress.percent).toBe(0);
  });

  it('computes overall percentage across all categories', () => {
    const progress = computeProgress(sample, { a1: true, b1: true });
    expect(progress.done).toBe(2);
    expect(progress.total).toBe(3);
    expect(progress.percent).toBe(67); // 2/3 rounded
  });

  it('breaks progress down per category independently', () => {
    const progress = computeProgress(sample, { a1: true, a2: true });
    const prologo = progress.byCategory.find((c) => c.category === 'Prólogo');
    const companion = progress.byCategory.find((c) => c.category === 'Companion');

    expect(prologo).toEqual({ category: 'Prólogo', done: 2, total: 2, percent: 100 });
    expect(companion).toEqual({ category: 'Companion', done: 0, total: 1, percent: 0 });
  });

  it('ignores checked ids that do not match any achievement', () => {
    const progress = computeProgress(sample, { 'not-a-real-id': true });
    expect(progress.done).toBe(0);
  });

  it('handles an empty achievement list without dividing by zero', () => {
    const progress = computeProgress([], {});
    expect(progress.total).toBe(0);
    expect(progress.percent).toBe(0);
    expect(progress.byCategory).toEqual([]);
  });
});
