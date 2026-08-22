export type AchievementCategory =
  'Prólogo' | 'Ato 1' | 'Ato 2' | 'Ato 3' | 'Companion' | 'Comunidade' | 'Endings';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  /** Path/URL to the achievement's icon. Leave empty to show a placeholder square. */
  image?: string;
}
