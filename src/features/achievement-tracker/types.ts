export type AchievementCategory =
  'Prólogo' | 'Ato 1' | 'Ato 2' | 'Ato 3' | 'Companion' | 'Comunidade' | 'Finais';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  /** Path/URL to the achievement's icon. Leave empty to show a placeholder square. */
  image?: string;
  /** When true, the description/image start blurred behind a "Revelar" button. Opt-in per achievement. */
  spoiler?: boolean;
}
