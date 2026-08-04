import type { AbilityKey } from '@/types/bg3';
import { ABILITY_LABELS } from '@/types/bg3';
import { MAX_SCORE, MIN_SCORE, abilityModifier } from '@/lib/pointBuy';

interface AbilityGaugeProps {
  abilityKey: AbilityKey;
  score: number;
  racialBonus: number;
  canIncrease: boolean;
  canDecrease: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function AbilityGauge({
  abilityKey,
  score,
  racialBonus,
  canIncrease,
  canDecrease,
  onIncrease,
  onDecrease,
}: AbilityGaugeProps) {
  const total = score + racialBonus;
  const mod = abilityModifier(total);
  const ticks = MAX_SCORE - MIN_SCORE;
  const filled = score - MIN_SCORE;

  return (
    <div className="parchment-panel flex flex-col gap-3 rounded-sm p-4">
      <div className="flex items-center justify-between">
        <span className="font-data text-xs uppercase tracking-[0.15em] text-ink-dim">
          {ABILITY_LABELS[abilityKey]}
        </span>
        <span className="font-data text-xs text-ink-faint">{abilityKey.toUpperCase()}</span>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-3xl text-gold-bright">{total}</span>
          {racialBonus !== 0 && (
            <span className="font-data text-xs text-emerald-bright">
              {score} {racialBonus > 0 ? '+' : ''}
              {racialBonus}
            </span>
          )}
        </div>
        <span className="font-data text-sm text-ink-dim">{mod >= 0 ? `+${mod}` : mod}</span>
      </div>

      <div className="flex gap-0.5" aria-hidden>
        {Array.from({ length: ticks + 1 }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-sm ${i <= filled ? 'bg-gold' : 'bg-border-ember'}`}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 pt-1">
        <button
          type="button"
          onClick={onDecrease}
          disabled={!canDecrease}
          aria-label={`Diminuir ${ABILITY_LABELS[abilityKey]}`}
          className="focus-ring flex h-7 w-7 items-center justify-center rounded-full border border-border-ember text-ink-dim hover:border-crimson hover:text-crimson-bright disabled:cursor-not-allowed disabled:opacity-30"
        >
          −
        </button>
        <button
          type="button"
          onClick={onIncrease}
          disabled={!canIncrease}
          aria-label={`Aumentar ${ABILITY_LABELS[abilityKey]}`}
          className="focus-ring flex h-7 w-7 items-center justify-center rounded-full border border-border-ember text-ink-dim hover:border-gold hover:text-gold-bright disabled:cursor-not-allowed disabled:opacity-30"
        >
          +
        </button>
      </div>
    </div>
  );
}
