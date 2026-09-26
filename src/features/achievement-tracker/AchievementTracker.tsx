import { achievements } from '@/features/achievement-tracker/data/achievements';
import { useAchievementStore } from '@/features/achievement-tracker/store/achievementStore';
import { computeProgress } from '@/features/achievement-tracker/lib/progress';
import { AchievementRow } from '@/features/achievement-tracker/components/AchievementRow';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';

export function AchievementTracker() {
  const checked = useAchievementStore((s) => s.checked);
  const toggle = useAchievementStore((s) => s.toggle);
  const resetAll = useAchievementStore((s) => s.resetAll);

  // Hidden achievements (easter eggs) stay off the list and out of the count
  // entirely until they've actually been unlocked.
  const visibleAchievements = achievements.filter((a) => !a.hidden || checked[a.id]);
  const progress = computeProgress(visibleAchievements, checked);

  function handleReset() {
    if (window.confirm('Isso desmarca todas as conquistas. Continuar?')) {
      resetAll();
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-10 md:px-6">
      <header>
        <h1 className="rune-title text-2xl text-gold-bright">Achievement Tracker</h1>
        <p className="mt-1 text-sm text-ink-dim">
          Marque manualmente as conquistas que você já desbloqueou em sua campanha.
        </p>
      </header>

      <div className="parchment-panel rounded-sm p-5">
        <ProgressBar percent={progress.percent} label={`${progress.done} de ${progress.total} conquistas`} />
      </div>

      <p className="font-data text-[11px] text-ink-faint">
        Lista retirada diretamente de guias da Steam e do aplicativo PS App.
      </p>

      <div className="flex flex-col gap-8">
        {progress.byCategory.map((cat) => (
          <section key={cat.category}>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="rune-title text-lg text-ink">{cat.category}</h2>
              <span className="font-data text-xs text-ink-faint">
                {cat.done}/{cat.total}
              </span>
            </div>
            <ul className="flex flex-col gap-2">
              {visibleAchievements
                .filter((a) => a.category === cat.category)
                .map((achievement) => (
                  <li key={achievement.id}>
                    <AchievementRow
                      achievement={achievement}
                      isChecked={Boolean(checked[achievement.id])}
                      onToggleCheck={() => toggle(achievement.id)}
                    />
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>

      <div>
        <Button variant="danger" onClick={handleReset}>
          Desmarcar tudo
        </Button>
      </div>
    </div>
  );
}
