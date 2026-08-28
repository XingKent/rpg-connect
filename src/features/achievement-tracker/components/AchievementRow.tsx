import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { Achievement } from '@/features/achievement-tracker/types';
import { AchievementIcon } from '@/features/achievement-tracker/components/AchievementIcon';

interface AchievementRowProps {
  achievement: Achievement;
  isChecked: boolean;
  onToggleCheck: () => void;
}

export function AchievementRow({ achievement, isChecked, onToggleCheck }: AchievementRowProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      className={`flex w-full items-center gap-3 rounded-sm border p-3 transition-colors duration-150 ${
        isChecked ? 'border-gold bg-surface-raised' : 'border-border-ember bg-surface'
      }`}
    >
      <button
        type="button"
        onClick={onToggleCheck}
        aria-pressed={isChecked}
        aria-label={isChecked ? `Desmarcar ${achievement.name}` : `Marcar ${achievement.name}`}
        className={`focus-ring flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border text-[11px] transition-colors ${
          isChecked
            ? 'border-gold-bright bg-gold text-void'
            : 'border-border-ember-bright text-transparent hover:border-gold-dim'
        }`}
      >
        ✓
      </button>

      <AchievementIcon
        image={revealed ? achievement.image : undefined}
        name={achievement.name}
        unlocked={isChecked}
      />

      <div className="min-w-0 flex-1">
        <span className={`rune-title block text-sm ${isChecked ? 'text-gold-bright' : 'text-ink'}`}>
          {achievement.name}
        </span>
        {revealed ? (
          <span className="text-sm text-ink-dim">{achievement.description}</span>
        ) : (
          <span className="relative block text-sm text-ink-dim">
            <span aria-hidden className="spoiler-hidden block">
              {achievement.description}
            </span>
            <span className="sr-only">Descrição oculta. Use o botão Revelar para exibir.</span>
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => setRevealed((v) => !v)}
        aria-expanded={revealed}
        className="focus-ring flex shrink-0 items-center gap-1 rounded-sm border border-border-ember px-2 py-1 font-data text-[10px] uppercase tracking-[0.08em] text-ink-faint transition-colors hover:border-gold-dim hover:text-gold-bright"
      >
        {revealed ? <EyeOff size={12} /> : <Eye size={12} />}
        {revealed ? 'Ocultar' : 'Revelar'}
      </button>
    </div>
  );
}
