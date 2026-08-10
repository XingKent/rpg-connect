export const DICE_TYPES = [4, 6, 8, 10, 12, 20, 100] as const;
export type DieType = (typeof DICE_TYPES)[number];

/** Rolls a single die with the given number of sides, returning an integer in [1, sides]. */
export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}
