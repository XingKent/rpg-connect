import { feats } from '@/data/feats';
import { SelectCard } from '@/components/ui/SelectCard';
import { Button } from '@/components/ui/Button';
import { useBuildStore, FEAT_LIMIT } from '@/features/build-planner/store/buildStore';

export function FeatsStep() {
  const draft = useBuildStore((s) => s.draft);
  const toggleFeat = useBuildStore((s) => s.toggleFeat);
  const clearFeats = useBuildStore((s) => s.clearFeats);
  const limitReached = draft.featIds.length >= FEAT_LIMIT;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="rune-title text-xl text-gold-bright">Talentos</h2>
          <p className="mt-1 text-sm text-ink-dim">
            Escolha até {FEAT_LIMIT} talentos que vão definir o estilo do seu personagem.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-data text-xs uppercase tracking-[0.15em] text-ink-faint">
            {draft.featIds.length}/{FEAT_LIMIT} escolhidos
          </span>
          {draft.featIds.length > 0 && (
            <Button variant="ghost" onClick={clearFeats}>
              Limpar seleção
            </Button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {feats.map((feat) => {
          const selected = draft.featIds.includes(feat.id);
          return (
            <SelectCard
              key={feat.id}
              title={feat.name}
              description={feat.description}
              selected={selected}
              disabled={!selected && limitReached}
              onClick={() => toggleFeat(feat.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
