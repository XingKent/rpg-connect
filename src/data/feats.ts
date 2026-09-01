import type { Feat } from '@/types/bg3';

export const feats: Feat[] = [
  {
    id: 'ability-improvement',
    name: 'Aprimoramento de Atributo',
    description:
      'Distribua 2 pontos entre os atributos (pode colocar os dois no mesmo), refinando os pontos fortes do personagem.',
    abilityChoice: { points: 2, amount: 1 },
  },
  {
    id: 'tavern-brawler',
    name: 'Brigão de Taverna',
    description:
      'Aumenta o dano desarmado e a força dos arremessos, além de melhorar a resistência a venenos.',
    abilityBonus: { str: 1 },
  },
  {
    id: 'alert',
    name: 'Alerta',
    description:
      'Reflexos aguçados garantem grande vantagem na iniciativa e reduzem a chance de ser emboscado.',
  },
  {
    id: 'great-weapon-master',
    name: 'Mestre em Armas Grandes',
    description: 'Troca precisão por dano bruto ao empunhar armas pesadas de duas mãos.',
  },
  {
    id: 'sharpshooter',
    name: 'Atirador de Elite',
    description: 'Ignora cobertura parcial e penalidades de longo alcance com armas à distância.',
  },
  {
    id: 'war-caster',
    name: 'Conjurador de Guerra',
    description:
      'Facilita a manutenção de concentração e permite conjurar magias mesmo com as mãos ocupadas.',
  },
  {
    id: 'resilient-con',
    name: 'Resiliente (Constituição)',
    description: 'Fortalece a constituição e garante proficiência em testes de resistência de constituição.',
    abilityBonus: { con: 1 },
  },
  {
    id: 'mobile',
    name: 'Ágil',
    description: 'Aumenta o deslocamento e evita ataques de oportunidade ao atacar corpo a corpo.',
  },
  {
    id: 'lucky',
    name: 'Sortudo',
    description: 'Concede pontos de sorte para forçar novas rolagens em momentos críticos.',
  },
];
