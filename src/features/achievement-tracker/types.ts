export type AchievementCategory =
  'Prólogo' | 'Ato 1' | 'Ato 2' | 'Ato 3' | 'Companion' | 'Comunidade' | 'Finais' | 'Secreta';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  /** Path/URL to the achievement's icon. Leave empty to show a placeholder square. */
  image?: string;
  /** When true, the description/image start blurred behind a "Revelar" button. Opt-in per achievement. */
  spoiler?: boolean;
  /** When true, this achievement never shows in the normal list/count until it's been unlocked. */
  hidden?: boolean;
}
