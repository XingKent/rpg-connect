import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { Achievement } from '@/features/achievement-tracker/types';
import { AchievementIcon } from '@/features/achievement-tracker/components/AchievementIcon';

const AUTO_DISMISS_MS = 6000;
const EXIT_ANIMATION_MS = 300;

interface AchievementUnlockedPopupProps {
  achievement: Achievement;
  onDismiss: () => void;
}

export function AchievementUnlockedPopup({ achievement, onDismiss }: AchievementUnlockedPopupProps) {
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const enterFrame = requestAnimationFrame(() => setEntered(true));
    const autoDismissTimer = setTimeout(() => setLeaving(true), AUTO_DISMISS_MS);
    return () => {
      cancelAnimationFrame(enterFrame);
      clearTimeout(autoDismissTimer);
    };
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const timer = setTimeout(onDismiss, EXIT_ANIMATION_MS);
    return () => clearTimeout(timer);
  }, [leaving, onDismiss]);

  function handleClose() {
    setLeaving(true);
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-auto fixed right-5 top-20 z-50 w-[min(22rem,90vw)] transition-all duration-300 ease-out"
      style={{
        transform: entered && !leaving ? 'translateX(0)' : 'translateX(120%)',
        opacity: entered && !leaving ? 1 : 0,
      }}
    >
      <div className="parchment-panel flex items-start gap-3 rounded-sm border-gold-bright p-4 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.8)]">
        <AchievementIcon image={achievement.image} name={achievement.name} unlocked />
        <div className="min-w-0 flex-1">
          <span className="font-data text-[11px] uppercase tracking-[0.15em] text-gold-bright">
            Conquista desbloqueada
          </span>
          <div className="rune-title mt-0.5 text-base text-ink">{achievement.name}</div>
          <p className="mt-1 text-sm text-ink-dim">{achievement.description}</p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Fechar notificação"
          className="focus-ring shrink-0 text-ink-faint hover:text-gold-bright"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
