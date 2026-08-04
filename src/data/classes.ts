import type { CharClass } from '@/types/bg3';

export const classes: CharClass[] = [
  {
    id: 'fighter',
    name: 'Guerreiro',
    description: 'Mestre das armas e da armadura, sobrevive em combate pela disciplina e pela força bruta.',
    hitDie: 10,
    primaryAbility: ['str', 'dex'],
    savingThrows: ['str', 'con'],
    subclasses: [
      {
        id: 'battle-master',
        name: 'Mestre de Batalha',
        description: 'Usa manobras táticas para controlar o campo de batalha.',
        levelAvailable: 3,
      },
      {
        id: 'eldritch-knight',
        name: 'Cavaleiro Arcano',
        description: 'Combina lâmina e magia arcana em um só golpe.',
        levelAvailable: 3,
      },
    ],
  },
  {
    id: 'wizard',
    name: 'Mago',
    description:
      'Estudioso da arcana que molda a realidade através de fórmulas mágicas cuidadosamente aprendidas.',
    hitDie: 6,
    primaryAbility: ['int'],
    savingThrows: ['int', 'wis'],
    subclasses: [
      {
        id: 'evocation',
        name: 'Evocação',
        description: 'Especialista em magias destrutivas de dano elemental.',
        levelAvailable: 2,
      },
      {
        id: 'necromancy',
        name: 'Necromancia',
        description: 'Manipula a força vital e comanda os mortos.',
        levelAvailable: 2,
      },
    ],
  },
  {
    id: 'cleric',
    name: 'Clérigo',
    description: 'Canal direto da vontade divina, equilibra cura e punição em nome de sua fé.',
    hitDie: 8,
    primaryAbility: ['wis'],
    savingThrows: ['wis', 'cha'],
    subclasses: [
      {
        id: 'life',
        name: 'Domínio da Vida',
        description: 'Foca em cura poderosa e suporte ao grupo.',
        levelAvailable: 1,
      },
      {
        id: 'light',
        name: 'Domínio da Luz',
        description: 'Usa magia radiante para queimar as trevas.',
        levelAvailable: 1,
      },
    ],
  },
  {
    id: 'druid',
    name: 'Druida',
    description: 'Guardião da natureza selvagem, capaz de assumir formas animais e comandar os elementos.',
    hitDie: 8,
    primaryAbility: ['wis'],
    savingThrows: ['int', 'wis'],
    subclasses: [
      {
        id: 'circle-of-the-moon',
        name: 'Círculo da Lua',
        description: 'Metamorfose de combate em bestas poderosas.',
        levelAvailable: 2,
      },
      {
        id: 'circle-of-the-land',
        name: 'Círculo da Terra',
        description: 'Magia natural ampliada e versátil.',
        levelAvailable: 2,
      },
    ],
  },
  {
    id: 'rogue',
    name: 'Ladino',
    description:
      'Mestre da furtividade e da precisão, encontra a abertura perfeita antes que o inimigo perceba.',
    hitDie: 8,
    primaryAbility: ['dex'],
    savingThrows: ['dex', 'int'],
    subclasses: [
      {
        id: 'thief',
        name: 'Ladrão',
        description: 'Agilidade extrema e uso de itens em pleno combate.',
        levelAvailable: 3,
      },
      {
        id: 'assassin',
        name: 'Assassino',
        description: 'Golpes fatais contra alvos desprevenidos.',
        levelAvailable: 3,
      },
    ],
  },
  {
    id: 'barbarian',
    name: 'Bárbaro',
    description: 'Guerreiro selvagem que canaliza fúria primal para se tornar praticamente imparável.',
    hitDie: 12,
    primaryAbility: ['str'],
    savingThrows: ['str', 'con'],
    subclasses: [
      {
        id: 'berserker',
        name: 'Berserker',
        description: 'Fúria ofensiva que sacrifica defesa por dano.',
        levelAvailable: 3,
      },
      {
        id: 'wildheart',
        name: 'Coração Selvagem',
        description: 'Fúria com traços de espírito animal.',
        levelAvailable: 3,
      },
    ],
  },
];
