import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  'aria-label'?: string;
}

export function SearchInput({ value, onChange, placeholder, ...rest }: SearchInputProps) {
  return (
    <div className="relative">
      <Search
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={rest['aria-label']}
        className="focus-ring w-full rounded-sm border border-border-ember bg-surface-inset py-2 pl-9 pr-9 text-sm text-ink placeholder:text-ink-faint"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Limpar busca"
          className="focus-ring absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-gold-bright"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
