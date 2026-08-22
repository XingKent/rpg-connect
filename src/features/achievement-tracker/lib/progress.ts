import type { Achievement, AchievementCategory } from '@/features/achievement-tracker/types';

export interface CategoryProgress {
  category: AchievementCategory;
  done: number;
  total: number;
  percent: number;
}

export interface OverallProgress {
  done: number;
  total: number;
  percent: number;
  byCategory: CategoryProgress[];
}

function percentOf(done: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((done / total) * 100);
}

export function computeProgress(
  achievements: Achievement[],
  checked: Record<string, boolean>
): OverallProgress {
  const categories = [...new Set(achievements.map((a) => a.category))];

  const byCategory: CategoryProgress[] = categories.map((category) => {
    const inCategory = achievements.filter((a) => a.category === category);
    const done = inCategory.filter((a) => checked[a.id]).length;
    return { category, done, total: inCategory.length, percent: percentOf(done, inCategory.length) };
  });

  const done = achievements.filter((a) => checked[a.id]).length;
  const total = achievements.length;

  return { done, total, percent: percentOf(done, total), byCategory };
}
