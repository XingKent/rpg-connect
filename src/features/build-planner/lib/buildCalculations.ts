import { equipmentStatAbilityKey, ABILITY_LABELS } from '@/types/bg3';
import type { AbilityKey, AbilityScores, Build, Equipment, Feat } from '@/types/bg3';
import { races } from '@/data/races';
import { classes } from '@/data/classes';
import { feats } from '@/data/feats';
import { equipment } from '@/data/equipment';
import { abilityModifier } from '@/features/build-planner/lib/pointBuy';

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
    if (!feat) continue;

    if (feat.abilityBonus) {
      for (const key of ABILITY_KEYS) {
        if (feat.abilityBonus[key]) combined[key] = (combined[key] ?? 0) + (feat.abilityBonus[key] ?? 0);
      }
    }

    if (feat.abilityChoice) {
      const chosen = build.featAbilityChoices[featId] ?? {};
      for (const key of ABILITY_KEYS) {
        const points = chosen[key] ?? 0;
        if (points > 0) combined[key] = (combined[key] ?? 0) + points * feat.abilityChoice.amount;
      }
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
  const dexMod = mods.dex;

  const equippedItems = build.equipmentIds
    .map((id) => equipment.find((e) => e.id === id))
    .filter((item): item is Equipment => Boolean(item));

  const armorItem = equippedItems.find((item) => item.slot === 'armor' && item.armor);

  let base: number;
  let dexContribution: number;
  if (armorItem?.armor) {
    base = armorItem.armor.baseArmorClass;
    if (armorItem.armor.category === 'light') dexContribution = dexMod;
    else if (armorItem.armor.category === 'medium') dexContribution = Math.min(dexMod, 2);
    else dexContribution = 0; // heavy armor ignores Dexterity
  } else {
    base = 10; // unarmored
    dexContribution = dexMod;
  }

  // Flat AC bonuses from any equipped item (rings, cloaks, magic enhancement on armor itself, etc.)
  const flatBonus = equippedItems.reduce((sum, item) => {
    const acStats = item.stats.filter((s) => s.type === 'armor-class');
    const acTotal = acStats.reduce((acSum, s) => {
      const numericValue = typeof s.value === 'number' ? s.value : Number(s.value);
      return Number.isNaN(numericValue) ? acSum : acSum + numericValue;
    }, 0);
    return sum + acTotal;
  }, 0);

  return base + dexContribution + flatBonus;
}

/** True if any selected feat with an ability-choice sub-step hasn't had all its points allocated yet. */
export function hasIncompleteFeatChoices(build: Build): boolean {
  return build.featIds.some((featId) => {
    const feat = feats.find((f) => f.id === featId);
    if (!feat?.abilityChoice) return false;
    const chosen = build.featAbilityChoices[featId] ?? {};
    const totalAllocated = Object.values(chosen).reduce((sum, n) => sum + (n ?? 0), 0);
    return totalAllocated < feat.abilityChoice.points;
  });
}

export function buildCompleteness(build: Build) {
  const pointsUsed = ABILITY_KEYS.some((key) => build.abilityScores[key] !== 8);
  return {
    race: Boolean(build.raceId),
    class: Boolean(build.classId),
    subclass: Boolean(build.subclassId),
    abilities: pointsUsed,
    feats: build.featIds.length > 0 && !hasIncompleteFeatChoices(build),
    spells: build.spellIds.length > 0,
    equipment: build.equipmentIds.length > 0,
  };
}

/** Human-readable feat label, appending allocated ability points when the feat has a choice (e.g. "+2 Força"). */
export function formatFeatLabel(feat: Feat, build: Build): string {
  if (!feat.abilityChoice) return feat.name;
  const chosen = build.featAbilityChoices[feat.id] ?? {};
  const entries = ABILITY_KEYS.filter((key) => (chosen[key] ?? 0) > 0);
  if (entries.length === 0) return feat.name;
  const detail = entries
    .map((key) => `${ABILITY_LABELS[key]} +${(chosen[key] ?? 0) * feat.abilityChoice!.amount}`)
    .join(', ');
  return `${feat.name} (${detail})`;
}
