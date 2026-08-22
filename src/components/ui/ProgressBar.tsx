interface ProgressBarProps {
  percent: number;
  label?: string;
}

export function ProgressBar({ percent, label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-center justify-between font-data text-[11px] uppercase tracking-[0.1em] text-ink-faint">
          <span>{label}</span>
          <span className="text-gold-bright">{clamped}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full overflow-hidden rounded-full bg-surface-inset"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-dim to-gold-bright transition-all duration-300"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
