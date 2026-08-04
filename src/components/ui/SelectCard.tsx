import type { ReactNode } from 'react';

interface SelectCardProps {
  title: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
  eyebrow?: string;
  footer?: ReactNode;
  disabled?: boolean;
}

export function SelectCard({
  title,
  description,
  selected,
  onClick,
  eyebrow,
  footer,
  disabled,
}: SelectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`focus-ring group relative flex w-full flex-col gap-1.5 rounded-sm border p-4 text-left transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${
        selected
          ? 'border-gold bg-surface-raised shadow-[0_0_0_1px_rgba(201,161,92,0.4)]'
          : 'border-border-ember bg-surface hover:border-border-ember-bright hover:bg-surface-raised'
      }`}
    >
      {selected && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border border-gold-bright bg-gold text-[10px] text-void">
          ✓
        </span>
      )}
      {eyebrow && (
        <span className="font-data text-[11px] uppercase tracking-[0.15em] text-ink-faint">{eyebrow}</span>
      )}
      <span className={`rune-title text-base ${selected ? 'text-gold-bright' : 'text-ink'}`}>{title}</span>
      {description && <span className="text-sm leading-snug text-ink-dim">{description}</span>}
      {footer}
    </button>
  );
}
