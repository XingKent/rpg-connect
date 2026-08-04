import { feats } from '@/data/feats';
import { SelectCard } from '@/components/ui/SelectCard';
import { useBuildStore } from '@/store/buildStore';

export function FeatsStep() {
  const draft = useBuildStore((s) => s.draft);
  const toggleFeat = useBuildStore((s) => s.toggleFeat);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h2 className="rune-title text-xl text-gold-bright">Talentos</h2>
        <p className="mt-1 text-sm text-ink-dim">
          Escolha os talentos que vão definir o estilo do seu personagem.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {feats.map((feat) => (
          <SelectCard
            key={feat.id}
            title={feat.name}
            description={feat.description}
            selected={draft.featIds.includes(feat.id)}
            onClick={() => toggleFeat(feat.id)}
          />
        ))}
      </div>
    </div>
  );
}
