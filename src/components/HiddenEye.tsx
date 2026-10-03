import { useEffect, useRef, useState } from 'react';
import { rollDie } from '@/lib/dice';
import { rollPerceptionCheck, PERCEPTION_DC, type PerceptionResult } from '@/lib/perceptionCheck';
import { useAchievementStore } from '@/features/achievement-tracker/store/achievementStore';
import { achievements } from '@/features/achievement-tracker/data/achievements';
import { AchievementUnlockedPopup } from '@/features/achievement-tracker/components/AchievementUnlockedPopup';
import { CriticalSparkles } from '@/components/CriticalSparkles';

const SHARP_EYED_ID = 'Sharp-Eyed';
const SHARP_EYED_ACHIEVEMENT = achievements.find((a) => a.id === SHARP_EYED_ID)!;
const ROLL_ANIMATION_FRAMES = 6;
const ROLL_ANIMATION_INTERVAL_MS = 50;
const TOAST_DURATION_MS = 5000;

interface ToastState {
  result: PerceptionResult;
  roll: number;
  firstTime: boolean;
}

const FAIL_LINES = ['Nada por aqui. Ou será que tem?', 'Você olha em volta. Só sombras e pergaminho.'];

export function HiddenEye() {
  const checked = useAchievementStore((s) => s.checked);
  const unlock = useAchievementStore((s) => s.unlock);

  const [rolling, setRolling] = useState(false);
  const [displayValue, setDisplayValue] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showUnlockPopup, setShowUnlockPopup] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  function handleClick() {
    if (rolling) return;
    setRolling(true);

    let frame = 0;
    const interval = setInterval(() => {
      setDisplayValue(rollDie(20));
      frame += 1;
      if (frame >= ROLL_ANIMATION_FRAMES) {
        clearInterval(interval);
        const outcome = rollPerceptionCheck();
        const alreadyUnlocked = Boolean(checked[SHARP_EYED_ID]);
        setDisplayValue(outcome.roll);
        setRolling(false);

        if (outcome.result !== 'fail') {
          unlock(SHARP_EYED_ID);
          if (!alreadyUnlocked) setShowUnlockPopup(true);
        }
        if (outcome.result === 'critical') {
          setShowSparkles(true);
        }

        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        setToast({ result: outcome.result, roll: outcome.roll, firstTime: !alreadyUnlocked });
        toastTimerRef.current = setTimeout(() => setToast(null), TOAST_DURATION_MS);
      }
    }, ROLL_ANIMATION_INTERVAL_MS);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="???"
        title=""
        disabled={rolling}
        className="focus-ring before:absolute before:-inset-2 before:content-[''] relative inline-block h-[3px] w-[3px] translate-y-px rounded-full bg-current align-baseline outline-none transition-transform duration-150 hover:scale-150 focus-visible:scale-150"
      />

      {(rolling || toast) && (
        <span
          role="status"
          className="pointer-events-none fixed bottom-24 right-5 z-40 flex items-center gap-2 rounded-sm border border-gold-dim bg-surface px-3 py-2 font-data text-xs text-ink shadow-[0_8px_20px_-6px_rgba(0,0,0,0.7)]"
        >
          {rolling && (
            <>
              <span className="text-ink-faint">Teste de Percepção...</span>
              <span className="text-gold-bright">{displayValue}</span>
            </>
          )}
          {!rolling && toast && <ToastMessage toast={toast} />}
        </span>
      )}

      {showSparkles && <CriticalSparkles onDone={() => setShowSparkles(false)} />}

      {showUnlockPopup && (
        <AchievementUnlockedPopup
          achievement={SHARP_EYED_ACHIEVEMENT}
          onDismiss={() => setShowUnlockPopup(false)}
        />
      )}
    </>
  );
}

function ToastMessage({ toast }: { toast: ToastState }) {
  if (toast.result === 'fail') {
    const line = FAIL_LINES[toast.roll % FAIL_LINES.length];
    return (
      <span className="text-ink-dim">
        {toast.roll} vs CD {PERCEPTION_DC}. {line}
      </span>
    );
  }

  if (toast.result === 'critical') {
    return (
      <span className="text-yellow-400">
        Crítico natural! {toast.firstTime ? 'Sucesso espetacular.' : 'De novo!? Impressionante.'}
      </span>
    );
  }

  return (
    <span className="text-gold-bright">
      {toast.roll} vs CD {PERCEPTION_DC}.{' '}
      {toast.firstTime ? 'Sucesso!' : 'Você já sabia, mas ainda funciona.'}
    </span>
  );
}
