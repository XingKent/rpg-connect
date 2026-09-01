import type { AbilityKey, AbilityScores, Build } from '@/types/bg3';
import { DEFAULT_SCORES } from '@/features/build-planner/lib/pointBuy';
import { clampLevel } from '@/features/build-planner/lib/level';

const ABILITY_KEYS: AbilityKey[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

const ABILITY_KEY_SET = new Set<AbilityKey>(ABILITY_KEYS);

function normalizeAbilityScores(value: unknown): AbilityScores {
  if (typeof value !== 'object' || value === null) return { ...DEFAULT_SCORES };
  const source = value as Partial<AbilityScores>;
  const result = { ...DEFAULT_SCORES };
  for (const key of ABILITY_KEYS) {
    if (typeof source[key] === 'number') result[key] = source[key] as number;
  }
  return result;
}

/**
 * Normalizes a single feat's ability-choice entry. Handles two legacy shapes:
 * - an array of ability keys (one point each, no repeats) from before points existed
 * - anything invalid/missing, which becomes an empty allocation
 * The current shape (ability -> points allocated) passes through unchanged.
 */
function normalizeAbilityPointMap(value: unknown): Partial<Record<AbilityKey, number>> {
  if (Array.isArray(value)) {
    const result: Partial<Record<AbilityKey, number>> = {};
    for (const key of value) {
      if (ABILITY_KEY_SET.has(key)) result[key as AbilityKey] = (result[key as AbilityKey] ?? 0) + 1;
    }
    return result;
  }
  if (typeof value === 'object' && value !== null) {
    const result: Partial<Record<AbilityKey, number>> = {};
    for (const key of ABILITY_KEYS) {
      const points = (value as Record<string, unknown>)[key];
      if (typeof points === 'number' && points > 0) result[key] = points;
    }
    return result;
  }
  return {};
}

function normalizeFeatAbilityChoices(value: unknown): Build['featAbilityChoices'] {
  if (typeof value !== 'object' || value === null) return {};
  const result: Build['featAbilityChoices'] = {};
  for (const [featId, entry] of Object.entries(value as Record<string, unknown>)) {
    result[featId] = normalizeAbilityPointMap(entry);
  }
  return result;
}

/**
 * Fills in defaults for any field missing from an older Build shape (e.g. a build saved or
 * shared before `level` or `featAbilityChoices` existed). Safe to call on any already-valid
 * Build too - it just passes those fields through unchanged.
 */
export function normalizeBuild(raw: Partial<Build>): Build {
  const input = raw as Record<string, unknown>;
  const now = new Date().toISOString();
  return {
    id: typeof input.id === 'string' && input.id ? input.id : crypto.randomUUID(),
    name: typeof input.name === 'string' ? input.name : '',
    level: typeof input.level === 'number' ? clampLevel(input.level) : 12,
    raceId: typeof input.raceId === 'string' ? input.raceId : '',
    subraceId: typeof input.subraceId === 'string' ? input.subraceId : undefined,
    classId: typeof input.classId === 'string' ? input.classId : '',
    subclassId: typeof input.subclassId === 'string' ? input.subclassId : undefined,
    abilityScores: normalizeAbilityScores(input.abilityScores),
    featIds: Array.isArray(input.featIds) ? input.featIds : [],
    featAbilityChoices: normalizeFeatAbilityChoices(input.featAbilityChoices),
    spellIds: Array.isArray(input.spellIds) ? input.spellIds : [],
    equipmentIds: Array.isArray(input.equipmentIds) ? input.equipmentIds : [],
    createdAt: typeof input.createdAt === 'string' ? input.createdAt : now,
    updatedAt: typeof input.updatedAt === 'string' ? input.updatedAt : now,
  };
}
