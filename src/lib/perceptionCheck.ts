import { rollDie, classifyRoll } from '@/lib/dice';

/** The DC the hidden eye's Perception check is set against. */
export const PERCEPTION_DC = 15;

export type PerceptionResult = 'fail' | 'success' | 'critical';

export interface PerceptionCheckOutcome {
  roll: number;
  result: PerceptionResult;
}

/**
 * Rolls a d20 Perception check against PERCEPTION_DC.
 * A natural 20 always succeeds spectacularly (critical), a natural 1 always fails,
 * and everything else compares the roll straight against the DC (no modifiers - this
 * is a flat, no-strings-attached check).
 */
export function rollPerceptionCheck(): PerceptionCheckOutcome {
  const roll = rollDie(20);
  const outcome = classifyRoll(roll, 20);

  if (outcome === 'critical') return { roll, result: 'critical' };
  if (outcome === 'fumble') return { roll, result: 'fail' };
  return { roll, result: roll >= PERCEPTION_DC ? 'success' : 'fail' };
}
