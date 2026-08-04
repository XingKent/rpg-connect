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

export interface Feat {
  id: string;
  name: string;
  description: string;
  abilityBonus?: Partial<AbilityScores>;
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

export interface Equipment {
  id: string;
  name: string;
  slot: EquipmentSlot;
  rarity: Rarity;
  description: string;
  stats: Partial<Record<AbilityKey, number>> & { armorClass?: number; damage?: string };
}

export interface Build {
  id: string;
  name: string;
  raceId: string;
  subraceId?: string;
  classId: string;
  subclassId?: string;
  abilityScores: AbilityScores;
  featIds: string[];
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
