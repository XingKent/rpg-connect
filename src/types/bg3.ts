export type AbilityKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export const ABILITY_LABELS: Record<AbilityKey, string> = {
  str: 'Força',
  dex: 'Destreza',
  con: 'Constituição',
  int: 'Inteligência',
  wis: 'Sabedoria',
  cha: 'Carisma',
};

export type AbilityScores = Record<AbilityKey, number>;

export interface Subrace {
  id: string;
  name: string;
  bonuses: Partial<AbilityScores>;
  traits: string[];
}

export interface Race {
  id: string;
  name: string;
  description: string;
  baseBonuses: Partial<AbilityScores>;
  traits: string[];
  subraces?: Subrace[];
}

export interface Subclass {
  id: string;
  name: string;
  description: string;
  levelAvailable: number;
}

export interface CharClass {
  id: string;
  name: string;
  description: string;
  hitDie: number;
  primaryAbility: AbilityKey[];
  savingThrows: AbilityKey[];
  subclasses: Subclass[];
}

export interface FeatAbilityChoice {
  /** How many different abilities the player must pick. */
  picks: number;
  /** Bonus applied to each picked ability. */
  amount: number;
}

export interface Feat {
  id: string;
  name: string;
  description: string;
  abilityBonus?: Partial<AbilityScores>;
  /** Present when picking this feat requires an extra sub-step (e.g. choosing which abilities to raise). */
  abilityChoice?: FeatAbilityChoice;
}

export interface Spell {
  id: string;
  name: string;
  level: number;
  school: string;
  classes: string[];
  description: string;
}

export type EquipmentSlot =
  'weapon' | 'armor' | 'headwear' | 'cloak' | 'gloves' | 'boots' | 'amulet' | 'ring';

export type Rarity = 'common' | 'uncommon' | 'rare' | 'very-rare' | 'legendary';

export type EquipmentStatType =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma'
  | 'armor-class'
  | 'initiative'
  | 'movement'
  | 'damage'
  | 'spell-save-dc'
  | 'spell-attack';

export interface EquipmentStat {
  type: EquipmentStatType;
  value: number | string;
}

export type EquipmentActionCooldown = 'none' | 'short-rest' | 'long-rest';
export type EquipmentActionType = 'spell' | 'passive' | 'action' | 'bonus-action' | 'reaction';

export interface EquipmentAction {
  name: string;
  description: string;
  cooldown: EquipmentActionCooldown;
  type: EquipmentActionType;
}

export interface Equipment {
  id: string;
  name: string;
  slot: EquipmentSlot;
  rarity: Rarity;
  act: 1 | 2 | 3;
  weight: number;
  value: number;
  image: string;
  description: string;
  location: string;
  classes?: string[];
  /** Classes/builds that get the most value out of this item. */
  bestFor?: string[];
  stats: EquipmentStat[];
  actions?: EquipmentAction[];
}

const ABILITY_STAT_TO_KEY: Partial<Record<EquipmentStatType, AbilityKey>> = {
  strength: 'str',
  dexterity: 'dex',
  constitution: 'con',
  intelligence: 'int',
  wisdom: 'wis',
  charisma: 'cha',
};

export function equipmentStatAbilityKey(type: EquipmentStatType): AbilityKey | undefined {
  return ABILITY_STAT_TO_KEY[type];
}

export const EQUIPMENT_STAT_LABELS: Record<EquipmentStatType, string> = {
  strength: 'Força',
  dexterity: 'Destreza',
  constitution: 'Constituição',
  intelligence: 'Inteligência',
  wisdom: 'Sabedoria',
  charisma: 'Carisma',
  'armor-class': 'Classe de Armadura',
  initiative: 'Iniciativa',
  movement: 'Deslocamento',
  damage: 'Dano',
  'spell-save-dc': 'CD de Magia',
  'spell-attack': 'Bônus de Ataque Mágico',
};

export const EQUIPMENT_ACTION_TYPE_LABELS: Record<EquipmentActionType, string> = {
  spell: 'Magia',
  passive: 'Passiva',
  action: 'Ação',
  'bonus-action': 'Ação Bônus',
  reaction: 'Reação',
};

export const EQUIPMENT_ACTION_COOLDOWN_LABELS: Record<EquipmentActionCooldown, string> = {
  none: 'Sem recarga',
  'short-rest': 'Por descanso curto',
  'long-rest': 'Por descanso longo',
};

export interface Build {
  id: string;
  name: string;
  level: number;
  raceId: string;
  subraceId?: string;
  classId: string;
  subclassId?: string;
  abilityScores: AbilityScores;
  featIds: string[];
  /** Chosen abilities per feat, for feats whose abilityChoice requires an extra pick (featId -> ability keys). */
  featAbilityChoices: Record<string, AbilityKey[]>;
  spellIds: string[];
  equipmentIds: string[];
  createdAt: string;
  updatedAt: string;
}

export const RARITY_LABELS: Record<Rarity, string> = {
  common: 'Comum',
  uncommon: 'Incomum',
  rare: 'Raro',
  'very-rare': 'Muito raro',
  legendary: 'Lendário',
};

export const RARITY_COLORS: Record<Rarity, string> = {
  common: 'text-ink-dim',
  uncommon: 'text-emerald-bright',
  rare: 'text-sky-300',
  'very-rare': 'text-purple-300',
  legendary: 'text-gold-bright',
};
