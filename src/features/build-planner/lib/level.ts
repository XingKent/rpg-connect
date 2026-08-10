export const MIN_CHARACTER_LEVEL = 1;
export const MAX_CHARACTER_LEVEL = 12;

/**
 * Number of feat slots available at a given character level.
 * Simplified milestone progression: level 4, 8 and 12.
 */
export function featSlotsForLevel(level: number): number {
  if (level >= 12) return 3;
  if (level >= 8) return 2;
  if (level >= 4) return 1;
  return 0;
}

/**
 * Highest spell level a full spellcaster can access at a given character level.
 * Simplified progression that reaches 6th-level spells at the level 12 cap.
 */
export function maxSpellLevelForCharacterLevel(level: number): number {
  return Math.min(6, Math.ceil(level / 2));
}

export function clampLevel(level: number): number {
  return Math.min(MAX_CHARACTER_LEVEL, Math.max(MIN_CHARACTER_LEVEL, level));
}
