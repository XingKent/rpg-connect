import type { AbilityKey, AbilityScores, Build } from '@/types/bg3';
import { DEFAULT_SCORES } from '@/features/build-planner/lib/pointBuy';
import { clampLevel } from '@/features/build-planner/lib/level';

const ABILITY_KEYS: AbilityKey[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

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
 * Fills in defaults for any field missing from an older Build shape (e.g. a build saved or
 * shared before `level` or `featAbilityChoices` existed). Safe to call on any already-valid
 * Build too — it just passes those fields through unchanged.
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
    featAbilityChoices:
      typeof input.featAbilityChoices === 'object' && input.featAbilityChoices !== null
        ? (input.featAbilityChoices as Build['featAbilityChoices'])
        : {},
    spellIds: Array.isArray(input.spellIds) ? input.spellIds : [],
    equipmentIds: Array.isArray(input.equipmentIds) ? input.equipmentIds : [],
    createdAt: typeof input.createdAt === 'string' ? input.createdAt : now,
    updatedAt: typeof input.updatedAt === 'string' ? input.updatedAt : now,
  };
}
