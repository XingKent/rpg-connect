import { describe, it, expect } from 'vitest';
import {
  featSlotsForLevel,
  maxSpellLevelForCharacterLevel,
  clampLevel,
  MIN_CHARACTER_LEVEL,
  MAX_CHARACTER_LEVEL,
} from '@/features/build-planner/lib/level';

describe('level rules', () => {
  it('grants feat slots at levels 4, 8 and 12', () => {
    expect(featSlotsForLevel(1)).toBe(0);
    expect(featSlotsForLevel(3)).toBe(0);
    expect(featSlotsForLevel(4)).toBe(1);
    expect(featSlotsForLevel(7)).toBe(1);
    expect(featSlotsForLevel(8)).toBe(2);
    expect(featSlotsForLevel(11)).toBe(2);
    expect(featSlotsForLevel(12)).toBe(3);
  });

  it('unlocks spell levels progressively, capping at 6th level by character level 11', () => {
    expect(maxSpellLevelForCharacterLevel(1)).toBe(1);
    expect(maxSpellLevelForCharacterLevel(2)).toBe(1);
    expect(maxSpellLevelForCharacterLevel(3)).toBe(2);
    expect(maxSpellLevelForCharacterLevel(5)).toBe(3);
    expect(maxSpellLevelForCharacterLevel(11)).toBe(6);
    expect(maxSpellLevelForCharacterLevel(12)).toBe(6);
  });

  it('clamps level to the 1-12 range', () => {
    expect(clampLevel(0)).toBe(MIN_CHARACTER_LEVEL);
    expect(clampLevel(-5)).toBe(MIN_CHARACTER_LEVEL);
    expect(clampLevel(20)).toBe(MAX_CHARACTER_LEVEL);
    expect(clampLevel(7)).toBe(7);
  });
});
