import { feats } from '@/data/feats';
import { ABILITY_LABELS, type AbilityKey } from '@/types/bg3';
import { SelectCard } from '@/components/ui/SelectCard';
import { Button } from '@/components/ui/Button';
import { useBuildStore } from '@/features/build-planner/store/buildStore';
import { featSlotsForLevel } from '@/features/build-planner/lib/level';

const ABILITY_ORDER: AbilityKey[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

export function FeatsStep() {
  const draft = useBuildStore((s) => s.draft);
  const toggleFeat = useBuildStore((s) => s.toggleFeat);
  const clearFeats = useBuildStore((s) => s.clearFeats);
  const toggleFeatAbilityChoice = useBuildStore((s) => s.toggleFeatAbilityChoice);

  const featLimit = featSlotsForLevel(draft.level);
  const limitReached = draft.featIds.length >= featLimit;

  const selectedFeatsWithChoice = feats.filter((f) => draft.featIds.includes(f.id) && f.abilityChoice);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="rune-title text-xl text-gold-bright">Talentos</h2>
          <p className="mt-1 text-sm text-ink-dim">
            {featLimit === 0
              ? 'No nível atual seu personagem ainda não tem talentos disponíveis (o primeiro chega no nível 4).'
              : `Escolha até ${featLimit} talento${featLimit > 1 ? 's' : ''} que vão definir o estilo do seu personagem.`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-data text-xs uppercase tracking-[0.15em] text-ink-faint">
            {draft.featIds.length}/{featLimit} escolhidos
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
              disabled={!selected && (limitReached || featLimit === 0)}
              onClick={() => toggleFeat(feat.id)}
            />
          );
        })}
      </div>

      {selectedFeatsWithChoice.length > 0 && (
        <div className="parchment-panel flex flex-col gap-5 rounded-sm border-l-2 !border-l-gold-dim p-4">
          <div>
            <span className="font-data text-[11px] uppercase tracking-[0.15em] text-gold-dim">
              Sub-etapa - Escolha de atributos
            </span>
            <p className="mt-1 text-sm text-ink-dim">
              Alguns talentos escolhidos exigem uma decisão extra antes de seguir.
            </p>
          </div>

          {selectedFeatsWithChoice.map((feat) => {
            const choice = feat.abilityChoice!;
            const chosen = draft.featAbilityChoices[feat.id] ?? [];
            const done = chosen.length >= choice.picks;
            return (
              <div key={feat.id}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rune-title text-sm text-ink">{feat.name}</span>
                  <span
                    className={`rounded-sm border px-1.5 py-0.5 font-data text-[10px] uppercase tracking-[0.08em] ${
                      done
                        ? 'border-emerald-bright/40 bg-emerald/10 text-emerald-bright'
                        : 'border-gold-bright/40 bg-gold/10 text-gold-bright'
                    }`}
                  >
                    {chosen.length}/{choice.picks} selecionados
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink-faint">
                  Escolha {choice.picks} atributos para receber +{choice.amount} cada.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {ABILITY_ORDER.map((ability) => {
                    const isChosen = chosen.includes(ability);
                    const disabled = !isChosen && chosen.length >= choice.picks;
                    return (
                      <button
                        key={ability}
                        type="button"
                        onClick={() => toggleFeatAbilityChoice(feat.id, ability)}
                        disabled={disabled}
                        aria-pressed={isChosen}
                        className={`focus-ring rounded-sm border px-3 py-1.5 font-data text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
                          isChosen
                            ? 'border-gold-bright bg-gold/10 text-gold-bright'
                            : 'border-border-ember text-ink-dim hover:border-border-ember-bright hover:text-ink'
                        }`}
                      >
                        {ABILITY_LABELS[ability]} +{choice.amount}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
