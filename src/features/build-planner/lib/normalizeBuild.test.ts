import { describe, it, expect } from 'vitest';
import { normalizeBuild } from '@/features/build-planner/lib/normalizeBuild';

describe('normalizeBuild', () => {
  it('backfills fields missing from a pre-level build (an old saved/shared build)', () => {
    const old = {
      id: 'old-id',
      name: 'Build Antiga',
      raceId: 'human',
      classId: 'wizard',
      abilityScores: { str: 8, dex: 8, con: 8, int: 15, wis: 8, cha: 8 },
      featIds: ['alert'],
      spellIds: ['fireball'],
      equipmentIds: [],
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
      // no `level`, no `featAbilityChoices` - as it would look before those fields existed
    };

    const normalized = normalizeBuild(old);

    expect(normalized.level).toBe(12);
    expect(normalized.featAbilityChoices).toEqual({});
    expect(normalized.name).toBe('Build Antiga');
    expect(normalized.featIds).toEqual(['alert']);
  });

  it('preserves every field on an already-valid, up-to-date build', () => {
    const valid = {
      id: 'id-1',
      name: 'Build Atual',
      level: 7,
      raceId: 'human',
      subraceId: undefined,
      classId: 'druid',
      subclassId: 'circle-of-the-moon',
      abilityScores: { str: 8, dex: 10, con: 14, int: 8, wis: 15, cha: 8 },
      featIds: [],
      featAbilityChoices: {},
      spellIds: [],
      equipmentIds: ['cloak-of-protection'],
      createdAt: '2026-02-01T00:00:00.000Z',
      updatedAt: '2026-02-02T00:00:00.000Z',
    };

    expect(normalizeBuild(valid)).toEqual(valid);
  });

  it('clamps an out-of-range level instead of trusting corrupted data', () => {
    const build = normalizeBuild({ level: 99 });
    expect(build.level).toBe(12);
  });

  it('falls back to safe defaults for a completely empty object', () => {
    const build = normalizeBuild({});
    expect(build.level).toBe(12);
    expect(build.raceId).toBe('');
    expect(build.featIds).toEqual([]);
    expect(build.featAbilityChoices).toEqual({});
    expect(build.abilityScores).toEqual({ str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 });
    expect(typeof build.id).toBe('string');
    expect(build.id.length).toBeGreaterThan(0);
  });
});
