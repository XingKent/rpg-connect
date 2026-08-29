export const DICE_TYPES = [4, 6, 8, 10, 12, 20] as const;
export type DieType = (typeof DICE_TYPES)[number];

export const CUSTOM_DIE_MIN = 1;
export const CUSTOM_DIE_MAX = 1000;

/** Rolls a single die with the given number of sides, returning an integer in [1, sides]. */
export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export type RollOutcome = 'fumble' | 'critical' | 'normal';

/** A natural 1 is always a fumble, and a natural max is always a critical, regardless of die size. */
export function classifyRoll(roll: number, sides: number): RollOutcome {
  if (roll === 1) return 'fumble';
  if (roll === sides) return 'critical';
  return 'normal';
}

/**
 * Critical hits and fumbles bypass modifiers entirely (a nat 1 always fails, a nat max
 * always succeeds), so the total only adds the modifier on a normal roll.
 */
export function computeRollTotal(roll: number, sides: number, modifier: number): number {
  return classifyRoll(roll, sides) === 'normal' ? roll + modifier : roll;
}
