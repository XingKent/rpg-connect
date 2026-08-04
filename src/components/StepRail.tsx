export interface StepDef {
  key: string;
  label: string;
  complete: boolean;
}

interface StepRailProps {
  steps: StepDef[];
  activeKey: string;
  onSelect: (key: string) => void;
}

export function StepRail({ steps, activeKey, onSelect }: StepRailProps) {
  return (
    <nav
      aria-label="Etapas da build"
      className="flex flex-row gap-1 overflow-x-auto pb-1 md:flex-col md:gap-0 md:overflow-visible md:pb-0"
    >
      {steps.map((step, i) => {
        const isActive = step.key === activeKey;
        const isLast = i === steps.length - 1;
        return (
          <div
            key={step.key}
            className="relative flex flex-row items-center gap-3 md:flex-col md:items-stretch"
          >
            <button
              type="button"
              onClick={() => onSelect(step.key)}
              className="focus-ring group flex shrink-0 flex-row items-center gap-3 rounded-sm py-2 text-left md:w-full"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-data text-xs transition-colors duration-150 ${
                  step.complete
                    ? 'border-gold-bright bg-gold text-void'
                    : isActive
                      ? 'border-gold-bright text-gold-bright'
                      : 'border-border-ember text-ink-faint group-hover:border-border-ember-bright'
                }`}
              >
                {step.complete ? '✦' : i + 1}
              </span>
              <span
                className={`hidden font-display text-sm tracking-wide md:inline ${
                  isActive ? 'text-gold-bright' : step.complete ? 'text-ink' : 'text-ink-faint'
                }`}
              >
                {step.label}
              </span>
            </button>
            {!isLast && (
              <span
                aria-hidden
                className={`hidden h-6 w-px self-center md:ml-4 md:block ${
                  step.complete ? 'bg-gold-dim' : 'bg-border-ember'
                }`}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
