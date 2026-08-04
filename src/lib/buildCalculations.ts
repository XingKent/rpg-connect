import { equipmentStatAbilityKey } from '@/types/bg3';
import type { AbilityKey, AbilityScores, Build } from '@/types/bg3';
import { races } from '@/data/races';
import { classes } from '@/data/classes';
import { feats } from '@/data/feats';
import { equipment } from '@/data/equipment';
import { abilityModifier } from '@/lib/pointBuy';

const ABILITY_KEYS: AbilityKey[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

export function getRace(raceId: string) {
  return races.find((r) => r.id === raceId);
}

export function getClass(classId: string) {
  return classes.find((c) => c.id === classId);
}

export function racialBonuses(build: Build): Partial<AbilityScores> {
  const race = getRace(build.raceId);
  if (!race) return {};
  const subrace = race.subraces?.find((s) => s.id === build.subraceId);
  const combined: Partial<AbilityScores> = { ...race.baseBonuses };
  if (subrace) {
    for (const key of ABILITY_KEYS) {
      combined[key] = (combined[key] ?? 0) + (subrace.bonuses[key] ?? 0);
    }
  }
  return combined;
}

export function featBonuses(build: Build): Partial<AbilityScores> {
  const combined: Partial<AbilityScores> = {};
  for (const featId of build.featIds) {
    const feat = feats.find((f) => f.id === featId);
    if (!feat?.abilityBonus) continue;
    for (const key of ABILITY_KEYS) {
      if (feat.abilityBonus[key]) combined[key] = (combined[key] ?? 0) + (feat.abilityBonus[key] ?? 0);
    }
  }
  return combined;
}

export function equipmentBonuses(build: Build): Partial<AbilityScores> {
  const combined: Partial<AbilityScores> = {};
  for (const itemId of build.equipmentIds) {
    const item = equipment.find((e) => e.id === itemId);
    if (!item) continue;
    for (const stat of item.stats) {
      const key = equipmentStatAbilityKey(stat.type);
      if (!key) continue;
      const numericValue = typeof stat.value === 'number' ? stat.value : Number(stat.value);
      if (Number.isNaN(numericValue)) continue;
      combined[key] = (combined[key] ?? 0) + numericValue;
    }
  }
  return combined;
}

export function finalScores(build: Build): AbilityScores {
  const racial = racialBonuses(build);
  const featB = featBonuses(build);
  const equipB = equipmentBonuses(build);
  const result = { ...build.abilityScores };
  for (const key of ABILITY_KEYS) {
    result[key] = build.abilityScores[key] + (racial[key] ?? 0) + (featB[key] ?? 0) + (equipB[key] ?? 0);
  }
  return result;
}

export function finalModifiers(build: Build): Record<AbilityKey, number> {
  const scores = finalScores(build);
  const mods: Partial<Record<AbilityKey, number>> = {};
  for (const key of ABILITY_KEYS) mods[key] = abilityModifier(scores[key]);
  return mods as Record<AbilityKey, number>;
}

export function baseArmorClass(build: Build): number {
  const mods = finalModifiers(build);
  const dexBonus = mods.dex;
  const equipBonus = build.equipmentIds.reduce((sum, id) => {
    const item = equipment.find((e) => e.id === id);
    if (!item) return sum;
    const acStats = item.stats.filter((s) => s.type === 'armor-class');
    const acTotal = acStats.reduce((acSum, s) => {
      const numericValue = typeof s.value === 'number' ? s.value : Number(s.value);
      return Number.isNaN(numericValue) ? acSum : acSum + numericValue;
    }, 0);
    return sum + acTotal;
  }, 0);
  return 10 + dexBonus + equipBonus;
}

export function buildCompleteness(build: Build) {
  const pointsUsed = ABILITY_KEYS.some((key) => build.abilityScores[key] !== 8);
  return {
    race: Boolean(build.raceId),
    class: Boolean(build.classId),
    subclass: Boolean(build.subclassId),
    abilities: pointsUsed,
    feats: build.featIds.length > 0,
    spells: build.spellIds.length > 0,
    equipment: build.equipmentIds.length > 0,
  };
}
