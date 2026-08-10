import type { Spell } from '@/types/bg3';

export const spells: Spell[] = [
  // Nível 0 — Truques
  {
    id: 'firebolt',
    name: 'Raio de Fogo',
    level: 0,
    school: 'Evocação',
    classes: ['wizard'],
    description: 'Dispara um projétil flamejante que queima o alvo à distância.',
  },
  {
    id: 'guidance',
    name: 'Orientação',
    level: 0,
    school: 'Adivinhação',
    classes: ['cleric', 'druid'],
    description: 'Concede um pequeno favor divino em um teste iminente.',
  },
  {
    id: 'shillelagh',
    name: 'Bastão Encantado',
    level: 0,
    school: 'Transmutação',
    classes: ['druid'],
    description: 'Imbui um cajado com energia natural, tornando-o uma arma mágica.',
  },

  // Nível 1
  {
    id: 'magic-missile',
    name: 'Mísseis Mágicos',
    level: 1,
    school: 'Evocação',
    classes: ['wizard'],
    description: 'Projéteis de força pura que atingem o alvo sem chance de erro.',
  },
  {
    id: 'shield',
    name: 'Escudo',
    level: 1,
    school: 'Abjuração',
    classes: ['wizard'],
    description: 'Cria uma barreira invisível que bloqueia um ataque iminente.',
  },
  {
    id: 'healing-word',
    name: 'Palavra Curativa',
    level: 1,
    school: 'Abjuração',
    classes: ['cleric', 'druid'],
    description: 'Cura ferimentos à distância com uma única palavra de poder.',
  },
  {
    id: 'entangle',
    name: 'Emaranhar',
    level: 1,
    school: 'Conjuração',
    classes: ['druid'],
    description: 'Faz plantas rasteiras prenderem os inimigos em uma área.',
  },

  // Nível 2
  {
    id: 'invisibility',
    name: 'Invisibilidade',
    level: 2,
    school: 'Ilusão',
    classes: ['wizard'],
    description: 'Torna o alvo invisível até que ataque ou conjure uma magia.',
  },
  {
    id: 'spiritual-weapon',
    name: 'Arma Espiritual',
    level: 2,
    school: 'Evocação',
    classes: ['cleric'],
    description: 'Invoca uma arma espectral que ataca por conta própria.',
  },
  {
    id: 'spike-growth',
    name: 'Crescimento de Espinhos',
    level: 2,
    school: 'Transmutação',
    classes: ['druid'],
    description: 'Faz espinhos afiados brotarem do solo, ferindo quem passar pela área.',
  },
  {
    id: 'moonbeam',
    name: 'Raio Lunar',
    level: 2,
    school: 'Evocação',
    classes: ['druid'],
    description: 'Um feixe de luz prateada queima criaturas com energia radiante.',
  },

  // Nível 3
  {
    id: 'fireball',
    name: 'Bola de Fogo',
    level: 3,
    school: 'Evocação',
    classes: ['wizard'],
    description: 'Uma explosão flamejante que devasta uma grande área ao redor do alvo.',
  },
  {
    id: 'revivify',
    name: 'Revificar',
    level: 3,
    school: 'Necromancia',
    classes: ['cleric'],
    description: 'Traz de volta à vida uma criatura recém-falecida.',
  },
  {
    id: 'call-lightning',
    name: 'Convocar Relâmpago',
    level: 3,
    school: 'Conjuração',
    classes: ['druid'],
    description: 'Chama uma nuvem de tempestade que dispara raios repetidos sobre os inimigos.',
  },

  // Nível 4
  {
    id: 'wall-of-fire',
    name: 'Parede de Fogo',
    level: 4,
    school: 'Evocação',
    classes: ['wizard'],
    description: 'Ergue uma muralha flamejante que queima qualquer um que a atravesse.',
  },
  {
    id: 'freedom-of-movement',
    name: 'Liberdade de Movimento',
    level: 4,
    school: 'Abjuração',
    classes: ['cleric'],
    description: 'Protege o alvo contra paralisia e efeitos que restringem o movimento.',
  },
  {
    id: 'polymorph-beast',
    name: 'Metamorfose Selvagem',
    level: 4,
    school: 'Transmutação',
    classes: ['druid'],
    description: 'Transforma uma criatura em uma fera, alterando drasticamente suas capacidades.',
  },

  // Nível 5
  {
    id: 'cone-of-cold',
    name: 'Cone de Frio',
    level: 5,
    school: 'Evocação',
    classes: ['wizard'],
    description: 'Um cone de frio devastador que congela tudo em seu caminho.',
  },
  {
    id: 'mass-cure-wounds',
    name: 'Cura em Massa',
    level: 5,
    school: 'Abjuração',
    classes: ['cleric'],
    description: 'Restaura pontos de vida de várias criaturas próximas ao mesmo tempo.',
  },
  {
    id: 'storm-fury',
    name: 'Fúria da Tempestade',
    level: 5,
    school: 'Conjuração',
    classes: ['druid'],
    description: 'Invoca ventos e granizo violentos que castigam uma grande área.',
  },

  // Nível 6
  {
    id: 'disintegrate',
    name: 'Desintegrar',
    level: 6,
    school: 'Transmutação',
    classes: ['wizard'],
    description: 'Um raio verde que reduz o alvo a poeira caso o dano seja suficiente.',
  },
  {
    id: 'true-restoration',
    name: 'Cura Absoluta',
    level: 6,
    school: 'Abjuração',
    classes: ['cleric'],
    description: 'Remove praticamente qualquer aflição e restaura o alvo por completo.',
  },
  {
    id: 'ancestral-beast-form',
    name: 'Forma da Fera Ancestral',
    level: 6,
    school: 'Transmutação',
    classes: ['druid'],
    description: 'Permite assumir a forma de uma fera lendária, muito além do alcance normal.',
  },
];
