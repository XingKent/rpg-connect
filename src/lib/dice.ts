export const DICE_TYPES = [4, 6, 8, 10, 12, 20] as const;
export type DieType = (typeof DICE_TYPES)[number];

export const CUSTOM_DIE_MIN = 1;
export const CUSTOM_DIE_MAX = 1000;

export const DICE_COUNT_MIN = 1;
export const DICE_COUNT_MAX = 20;

/** Rolls a single die with the given number of sides, returning an integer in [1, sides]. */
export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

/** Rolls `count` dice of the given size (e.g. rollMultiple(20, 2) for 2d20), one result per die. */
export function rollMultiple(sides: number, count: number): number[] {
  const clampedCount = Math.min(DICE_COUNT_MAX, Math.max(DICE_COUNT_MIN, count));
  return Array.from({ length: clampedCount }, () => rollDie(sides));
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

/**
 * Totals a multi-dice roll. With a single die, this is identical to computeRollTotal
 * (a nat 1/max still bypasses the modifier). With more than one die, there's no single
 * "natural roll" to call critical or fumble, so this just sums every die plus the modifier
 * once, like a damage roll (e.g. 2d6+3).
 */
export function computeMultiRollTotal(rolls: number[], sides: number, modifier: number): number {
  if (rolls.length === 1) return computeRollTotal(rolls[0], sides, modifier);
  return rolls.reduce((sum, r) => sum + r, 0) + modifier;
}
