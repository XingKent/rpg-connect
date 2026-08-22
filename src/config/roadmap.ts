import type { LucideIcon } from 'lucide-react';
import { Wand2, BookOpen, ScrollText, HeartHandshake, Map, Swords, Gem, Trophy } from 'lucide-react';

export type RoadmapStatus = 'done' | 'current' | 'planned';

export interface RoadmapItem {
  id: string;
  order: number;
  label: string;
  description: string;
  icon: LucideIcon;
  status: RoadmapStatus;
  /** Only set for parts that already have a route. */
  path?: string;
}

export const roadmap: RoadmapItem[] = [
  {
    id: 'build-planner',
    order: 1,
    label: 'Build Planner',
    description: 'Monte raça, classe, atributos, talentos, magias e equipamentos.',
    icon: Wand2,
    status: 'done',
    path: '/build-planner',
  },
  {
    id: 'wiki',
    order: 2,
    label: 'Wiki',
    description: 'Classes, raças, companheiros, feitiços, armas e mais — tudo pesquisável.',
    icon: BookOpen,
    status: 'planned',
  },
  {
    id: 'quest-tracker',
    order: 3,
    label: 'Quest Tracker',
    description: 'Acompanhe seu progresso de missões por ato.',
    icon: ScrollText,
    status: 'planned',
  },
  {
    id: 'companion-approval-tracker',
    order: 4,
    label: 'Companion Approval Tracker',
    description: 'Registre decisões e acompanhe a afinidade do seu grupo.',
    icon: HeartHandshake,
    status: 'planned',
  },
  {
    id: 'interactive-map',
    order: 5,
    label: 'Interactive Map',
    description: 'Mapa clicável com NPCs, loot, chefes e waypoints.',
    icon: Map,
    status: 'planned',
  },
  {
    id: 'combat-simulator',
    order: 6,
    label: 'Combat Simulator',
    description: 'Simule combates e veja chance de acerto, dano médio e sugestões táticas.',
    icon: Swords,
    status: 'planned',
  },
  {
    id: 'loot-finder',
    order: 7,
    label: 'Loot Finder',
    description: 'Encontre o melhor equipamento para cada build.',
    icon: Gem,
    status: 'planned',
  },
  {
    id: 'achievement-tracker',
    order: 8,
    label: 'Achievement Tracker',
    description: 'Marque manualmente as conquistas desbloqueadas na sua campanha.',
    icon: Trophy,
    status: 'current',
    path: '/achievement-tracker',
  },
];

export const TOTAL_PARTS = roadmap.length;
export const DONE_PARTS = roadmap.filter((r) => r.status === 'done').length;
export const CURRENT_PART = roadmap.find((r) => r.status === 'current');
