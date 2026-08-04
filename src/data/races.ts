import type { Race } from '@/types/bg3';

export const races: Race[] = [
  {
    id: 'human',
    name: 'Humano',
    description:
      'Adaptáveis e ambiciosos, os humanos não têm um talento nato dominante, mas compensam com versatilidade em qualquer caminho que escolham.',
    baseBonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    traits: ['Versátil: pequeno bônus em todos os atributos'],
  },
  {
    id: 'wood-elf',
    name: 'Elfo da Floresta',
    description:
      'Ágeis e silenciosos, os elfos da floresta se movem entre as árvores com uma graça que poucos conseguem igualar.',
    baseBonuses: { dex: 2 },
    traits: ['Visão no escuro', 'Resistência a encantamentos', 'Passo Élfico (velocidade extra)'],
    subraces: [
      {
        id: 'wood-elf-sub',
        name: 'Elfo da Floresta',
        bonuses: { wis: 1 },
        traits: ['Furtividade aprimorada em terrenos naturais'],
      },
    ],
  },
  {
    id: 'half-orc',
    name: 'Meio-Orc',
    description:
      'Fortes e resilientes, os meio-orcs carregam a resistência física de seus ancestrais em cada golpe que desferem.',
    baseBonuses: { str: 2, con: 1 },
    traits: ['Fúria Implacável (resiste à queda em 0 HP)', 'Ataques críticos aprimorados'],
  },
  {
    id: 'drow',
    name: 'Drow',
    description:
      'Vindos das profundezas do Subterrâneo, os drow enxergam no escuro absoluto e carregam um domínio natural sobre magias sombrias.',
    baseBonuses: { cha: 2 },
    traits: ['Visão no escuro superior', 'Afinidade com magias de Fada'],
    subraces: [
      {
        id: 'drow-sub',
        name: 'Drow das Profundezas',
        bonuses: { dex: 1 },
        traits: ['Sensibilidade à luz solar'],
      },
    ],
  },
  {
    id: 'githyanki',
    name: 'Githyanki',
    description:
      'Guerreiros psíquicos forjados em conflito constante, os githyanki empunham a espada e a mente com igual precisão.',
    baseBonuses: { str: 2 },
    traits: ['Habilidade psíquica inata', 'Proficiência com espada longa e média'],
  },
];
