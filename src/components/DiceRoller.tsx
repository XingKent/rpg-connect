import { useEffect, useRef, useState } from 'react';
import { Dices, RotateCcw, X } from 'lucide-react';
import {
  DICE_TYPES,
  CUSTOM_DIE_MIN,
  CUSTOM_DIE_MAX,
  rollDie,
  classifyRoll,
  computeRollTotal,
  type RollOutcome,
} from '@/lib/dice';

interface RollEntry {
  id: string;
  die: number;
  modifier: number;
  roll: number;
  total: number;
  outcome: RollOutcome;
}

const ROLL_ANIMATION_FRAMES = 7;
const ROLL_ANIMATION_INTERVAL_MS = 60;

const OUTCOME_TEXT_CLASSES: Record<RollOutcome, string> = {
  fumble: 'text-crimson-bright',
  critical: 'text-yellow-400',
  normal: 'text-ink',
};

export function DiceRoller() {
  const [open, setOpen] = useState(false);
  const [modifier, setModifier] = useState(0);
  const [customDie, setCustomDie] = useState(30);
  const [history, setHistory] = useState<RollEntry[]>([]);
  const [rollingDie, setRollingDie] = useState<number | null>(null);
  const [rollingValue, setRollingValue] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  function handleRoll(die: number) {
    if (rollingDie !== null || die < CUSTOM_DIE_MIN) return;
    setRollingDie(die);

    let frame = 0;
    const interval = setInterval(() => {
      setRollingValue(rollDie(die));
      frame += 1;
      if (frame >= ROLL_ANIMATION_FRAMES) {
        clearInterval(interval);
        const roll = rollDie(die);
        const outcome = classifyRoll(roll, die);
        const entry: RollEntry = {
          id: crypto.randomUUID(),
          die,
          modifier,
          roll,
          total: computeRollTotal(roll, die, modifier),
          outcome,
        };
        setHistory((prev) => [entry, ...prev].slice(0, 8));
        setRollingDie(null);
        setRollingValue(null);
      }
    }, ROLL_ANIMATION_INTERVAL_MS);
  }

  return (
    <div ref={containerRef} className="fixed bottom-5 right-5 z-30">
      {open && (
        <div className="parchment-panel absolute bottom-[calc(100%+0.75rem)] right-0 w-[min(20rem,90vw)] rounded-sm p-4">
          <div className="flex items-center justify-between">
            <span className="rune-title text-sm text-gold-bright">Rolagem de Dados</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="focus-ring text-ink-faint hover:text-gold-bright"
            >
              <X size={15} />
            </button>
          </div>
          <p className="mt-1 text-xs text-ink-faint">Só por diversão. Não afeta nenhuma build.</p>

          <div className="mt-3 flex items-center justify-between gap-3">
            <label
              htmlFor="dice-modifier"
              className="font-data text-[11px] uppercase tracking-[0.1em] text-ink-faint"
            >
              Modificador
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setModifier((m) => m - 1)}
                aria-label="Diminuir modificador"
                className="focus-ring flex h-6 w-6 items-center justify-center rounded-full border border-border-ember text-ink-dim hover:border-crimson hover:text-crimson-bright"
              >
                −
              </button>
              <span id="dice-modifier" className="w-8 text-center font-data text-sm text-ink">
                {modifier >= 0 ? `+${modifier}` : modifier}
              </span>
              <button
                type="button"
                onClick={() => setModifier((m) => m + 1)}
                aria-label="Aumentar modificador"
                className="focus-ring flex h-6 w-6 items-center justify-center rounded-full border border-border-ember text-ink-dim hover:border-gold hover:text-gold-bright"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {DICE_TYPES.map((die) => (
              <button
                key={die}
                type="button"
                onClick={() => handleRoll(die)}
                disabled={rollingDie !== null}
                className={`focus-ring flex flex-col items-center justify-center gap-0.5 rounded-sm border py-2 font-data text-xs transition-colors disabled:cursor-not-allowed ${
                  rollingDie === die
                    ? 'border-gold-bright bg-gold/10 text-gold-bright'
                    : 'border-border-ember text-ink-dim hover:border-gold-dim hover:text-gold-bright disabled:opacity-40'
                }`}
              >
                <span>d{die}</span>
                {rollingDie === die && <span className="text-[10px] text-gold-bright">{rollingValue}</span>}
              </button>
            ))}
          </div>

          <div className="mt-2 flex items-center gap-1.5">
            <label htmlFor="custom-die" className="sr-only">
              Dado personalizado
            </label>
            <span className="font-data text-xs text-ink-faint">d</span>
            <input
              id="custom-die"
              type="number"
              min={CUSTOM_DIE_MIN}
              max={CUSTOM_DIE_MAX}
              value={customDie}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (Number.isNaN(value)) return;
                setCustomDie(Math.min(CUSTOM_DIE_MAX, Math.max(CUSTOM_DIE_MIN, value)));
              }}
              className="focus-ring w-16 rounded-sm border border-border-ember bg-surface-inset px-2 py-1 font-data text-xs text-ink"
            />
            <button
              type="button"
              onClick={() => handleRoll(customDie)}
              disabled={rollingDie !== null}
              className={`focus-ring flex-1 rounded-sm border py-1.5 font-data text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                rollingDie === customDie
                  ? 'border-gold-bright bg-gold/10 text-gold-bright'
                  : 'border-border-ember text-ink-dim hover:border-gold-dim hover:text-gold-bright'
              }`}
            >
              {rollingDie === customDie ? `${rollingValue}` : 'Rolar personalizado'}
            </button>
          </div>

          {history.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="font-data text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                  Últimas rolagens
                </span>
                <button
                  type="button"
                  onClick={() => setHistory([])}
                  aria-label="Limpar histórico"
                  className="focus-ring flex items-center gap-1 text-ink-faint hover:text-gold-bright"
                >
                  <RotateCcw size={11} />
                </button>
              </div>
              <ul className="mt-1.5 flex flex-col gap-1">
                {history.map((entry) => (
                  <li
                    key={entry.id}
                    className="flex items-center justify-between font-data text-xs text-ink-dim"
                  >
                    <span>
                      d{entry.die}
                      {entry.modifier !== 0 && ` (${entry.modifier >= 0 ? '+' : ''}${entry.modifier})`}
                    </span>
                    <span className={OUTCOME_TEXT_CLASSES[entry.outcome]}>
                      {entry.outcome === 'fumble' && 'Erro crítico! '}
                      {entry.outcome === 'critical' && 'Crítico! '}
                      {entry.roll}
                      {entry.outcome === 'normal' && entry.modifier !== 0 && ` → ${entry.total}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Abrir rolagem de dados"
        className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border border-gold-dim bg-surface text-gold-bright shadow-[0_8px_20px_-6px_rgba(0,0,0,0.7)] transition-colors hover:border-gold-bright hover:bg-surface-raised"
      >
        <Dices size={20} />
      </button>
    </div>
  );
}
