import { Sparkles } from 'lucide-react';
import type { ContentSource } from '@/types/bg3';

interface SourceBadgeProps {
  source: ContentSource;
}

/** Renders nothing for plain SRD content. The badge only calls out what's specific to BG3. */
export function SourceBadge({ source }: SourceBadgeProps) {
  if (source !== 'bg3') return null;

  return (
    <span
      title="Item/magia específico de Baldur's Gate 3"
      className="inline-flex items-center gap-1 rounded-sm border border-gold-bright/50 bg-gold/10 px-1.5 py-0.5 font-data text-[10px] uppercase tracking-[0.08em] text-gold-bright"
    >
      <Sparkles size={10} />
      BG3
    </span>
  );
}
