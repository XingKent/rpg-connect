import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gold text-void border border-gold-bright hover:bg-gold-bright disabled:bg-border-ember disabled:text-ink-faint disabled:border-border-ember',
  ghost:
    'bg-transparent text-ink border border-border-ember hover:border-gold hover:text-gold-bright disabled:text-ink-faint disabled:border-border-ember',
  danger:
    'bg-transparent text-crimson-bright border border-crimson hover:bg-crimson hover:text-ink disabled:text-ink-faint disabled:border-border-ember',
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-150 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
