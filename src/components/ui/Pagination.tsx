import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Paginação" className="flex items-center justify-center gap-1.5">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Página anterior"
        className="focus-ring flex h-8 w-8 items-center justify-center rounded-sm border border-border-ember text-ink-dim hover:border-gold-dim hover:text-gold-bright disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft size={15} />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          className={`focus-ring flex h-8 w-8 items-center justify-center rounded-sm border font-data text-xs transition-colors ${
            p === page
              ? 'border-gold-bright bg-gold/10 text-gold-bright'
              : 'border-border-ember text-ink-dim hover:border-border-ember-bright hover:text-ink'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Próxima página"
        className="focus-ring flex h-8 w-8 items-center justify-center rounded-sm border border-border-ember text-ink-dim hover:border-gold-dim hover:text-gold-bright disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight size={15} />
      </button>
    </nav>
  );
}
