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
  {
  id: 'paladin',
  name: 'Paladino',
  description:
    'Guerreiro sagrado que une poder marcial e magia divina para proteger aliados e punir os ímpios.',
  hitDie: 10,
  primaryAbility: ['str', 'cha'],
  savingThrows: ['wis', 'cha'],
  subclasses: [
    {
      id: 'oath-of-devotion',
      name: 'Juramento da Devoção',
      description: 'Defensor da justiça, da honra e da compaixão.',
      levelAvailable: 1,
    },
    {
      id: 'oath-of-the-ancients',
      name: 'Juramento dos Anciões',
      description: 'Protege a vida, a natureza e a esperança.',
      levelAvailable: 1,
    },
    {
      id: 'oath-of-vengeance',
      name: 'Juramento da Vingança',
      description: 'Caça incansavelmente aqueles que praticam o mal.',
      levelAvailable: 1,
    },
  ],
  },
  {
    id: 'ranger',
    name: 'Patrulheiro',
    description:
      'Especialista em sobrevivência, rastreamento e combate à distância, sempre acompanhado pelos instintos da natureza.',
    hitDie: 10,
    primaryAbility: ['dex', 'wis'],
    savingThrows: ['str', 'dex'],
    subclasses: [
      {
        id: 'hunter',
        name: 'Caçador',
        description: 'Especialista em eliminar inimigos com eficiência.',
        levelAvailable: 3,
      },
      {
        id: 'beast-master',
        name: 'Mestre das Feras',
        description: 'Luta ao lado de um companheiro animal.',
        levelAvailable: 3,
      },
      {
        id: 'gloom-stalker',
        name: 'Espreitador das Trevas',
        description: 'Predador letal que domina sombras e emboscadas.',
        levelAvailable: 3,
      },
    ],
  },
  {
    id: 'warlock',
    name: 'Bruxo',
    description:
      'Conjura magia por meio de um pacto com uma poderosa entidade sobrenatural.',
    hitDie: 8,
    primaryAbility: ['cha'],
    savingThrows: ['wis', 'cha'],
    subclasses: [
      {
        id: 'the-fiend',
        name: 'O Ínfero',
        description: 'Recebe poder de um arquidiabo ou demônio.',
        levelAvailable: 1,
      },
      {
        id: 'the-great-old-one',
        name: 'O Grande Ancião',
        description: 'Canaliza poderes vindos de entidades cósmicas.',
        levelAvailable: 1,
      },
      {
        id: 'the-archfey',
        name: 'A Arquifada',
        description: 'Manipula ilusões, encantamentos e magia feérica.',
        levelAvailable: 1,
      },
    ],
  },
  {
    id: 'sorcerer',
    name: 'Feiticeiro',
    description:
      'Sua magia nasce de um poder inato que corre em suas veias.',
    hitDie: 6,
    primaryAbility: ['cha'],
    savingThrows: ['con', 'cha'],
    subclasses: [
      {
        id: 'draconic-bloodline',
        name: 'Linhagem Dracônica',
        description: 'Descendente do poder ancestral dos dragões.',
        levelAvailable: 1,
      },
      {
        id: 'wild-magic',
        name: 'Magia Selvagem',
        description: 'Manipula energias caóticas e imprevisíveis.',
        levelAvailable: 1,
      },
      {
        id: 'storm-sorcery',
        name: 'Feitiçaria da Tempestade',
        description: 'Controla ventos, trovões e relâmpagos.',
        levelAvailable: 1,
      },
    ],
  },
  {
    id: 'bard',
    name: 'Bardo',
    description:
      'Artista e aventureiro que inspira aliados e derrota inimigos através da música, da magia e da persuasão.',
    hitDie: 8,
    primaryAbility: ['cha'],
    savingThrows: ['dex', 'cha'],
    subclasses: [
      {
        id: 'college-of-lore',
        name: 'Colégio do Conhecimento',
        description: 'Valoriza conhecimento, versatilidade e magia.',
        levelAvailable: 3,
      },
      {
        id: 'college-of-valour',
        name: 'Colégio do Valor',
        description: 'Combina bravura marcial e inspiração.',
        levelAvailable: 3,
      },
      {
        id: 'college-of-swords',
        name: 'Colégio das Espadas',
        description: 'Transforma combate e performance em uma só arte.',
        levelAvailable: 3,
      },
    ],
  },
  {
    id: 'monk',
    name: 'Monge',
    description:
      'Mestre da disciplina corporal e espiritual, utiliza ki para realizar feitos sobre-humanos.',
    hitDie: 8,
    primaryAbility: ['dex', 'wis'],
    savingThrows: ['str', 'dex'],
    subclasses: [
      {
        id: 'way-of-the-open-hand',
        name: 'Caminho da Mão Aberta',
        description: 'Especialista em artes marciais puras e controle do combate.',
        levelAvailable: 3,
      },
      {
        id: 'way-of-shadow',
        name: 'Caminho das Sombras',
        description: 'Utiliza furtividade, teleporte e escuridão.',
        levelAvailable: 3,
      },
      {
        id: 'way-of-the-four-elements',
        name: 'Caminho dos Quatro Elementos',
        description: 'Canaliza fogo, água, ar e terra através do ki.',
        levelAvailable: 3,
      },
    ],
  },
];
