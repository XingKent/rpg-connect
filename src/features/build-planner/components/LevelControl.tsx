import { useBuildStore } from '@/features/build-planner/store/buildStore';
import { MIN_CHARACTER_LEVEL, MAX_CHARACTER_LEVEL } from '@/features/build-planner/lib/level';

export function LevelControl() {
  const level = useBuildStore((s) => s.draft.level);
  const setLevel = useBuildStore((s) => s.setLevel);

  return (
    <div className="parchment-panel flex items-center justify-between gap-3 rounded-sm p-3">
      <div>
        <div className="font-data text-[10px] uppercase tracking-[0.15em] text-ink-faint">Nível</div>
        <div className="font-display text-xl text-gold-bright">{level}</div>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setLevel(level - 1)}
          disabled={level <= MIN_CHARACTER_LEVEL}
          aria-label="Diminuir nível"
          className="focus-ring flex h-7 w-7 items-center justify-center rounded-full border border-border-ember text-ink-dim hover:border-crimson hover:text-crimson-bright disabled:cursor-not-allowed disabled:opacity-30"
        >
          −
        </button>
        <input
          type="range"
          min={MIN_CHARACTER_LEVEL}
          max={MAX_CHARACTER_LEVEL}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="accent-gold h-1 w-16"
          aria-label="Nível do personagem"
        />
        <button
          type="button"
          onClick={() => setLevel(level + 1)}
          disabled={level >= MAX_CHARACTER_LEVEL}
          aria-label="Aumentar nível"
          className="focus-ring flex h-7 w-7 items-center justify-center rounded-full border border-border-ember text-ink-dim hover:border-gold hover:text-gold-bright disabled:cursor-not-allowed disabled:opacity-30"
        >
          +
        </button>
      </div>
    </div>
  );
}
