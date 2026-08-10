import { useState } from 'react';
import { spells } from '@/data/spells';
import { SelectCard } from '@/components/ui/SelectCard';
import { Button } from '@/components/ui/Button';
import { useBuildStore } from '@/features/build-planner/store/buildStore';
import { maxSpellLevelForCharacterLevel } from '@/features/build-planner/lib/level';

const LEVEL_LABEL = (level: number) => (level === 0 ? 'Truques' : `Nível ${level}`);

export function SpellsStep() {
  const draft = useBuildStore((s) => s.draft);
  const toggleSpell = useBuildStore((s) => s.toggleSpell);
  const clearSpells = useBuildStore((s) => s.clearSpells);

  const maxLevel = maxSpellLevelForCharacterLevel(draft.level);
  const available = spells.filter(
    (sp) => (!draft.classId || sp.classes.includes(draft.classId)) && sp.level <= maxLevel
  );
  const levels = [...new Set(available.map((s) => s.level))].sort((a, b) => a - b);

  const [requestedLevel, setRequestedLevel] = useState<number | null>(null);
  const activeLevel =
    requestedLevel !== null && levels.includes(requestedLevel) ? requestedLevel : (levels[0] ?? 0);

  if (!draft.classId) {
    return (
      <div className="parchment-panel rounded-sm p-6 text-center text-sm text-ink-dim">
        Escolha uma classe primeiro para ver as magias disponíveis.
      </div>
    );
  }

  if (levels.length === 0) {
    return (
      <div className="parchment-panel rounded-sm p-6 text-center text-sm text-ink-dim">
        Esta classe não possui magias.
      </div>
    );
  }

  const spellsForActiveLevel = available.filter((sp) => sp.level === activeLevel);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="rune-title text-xl text-gold-bright">Magias</h2>
          <p className="mt-1 text-sm text-ink-dim">
            Selecione as magias conhecidas ou preparadas pelo seu personagem. No nível {draft.level}, magias
            até o {LEVEL_LABEL(maxLevel).toLowerCase()} estão disponíveis.
          </p>
        </div>
        {draft.spellIds.length > 0 && (
          <Button variant="ghost" onClick={clearSpells}>
            Limpar seleção
          </Button>
        )}
      </header>

      <nav aria-label="Nível de magia" className="flex flex-wrap gap-1.5 border-b border-border-ember pb-3">
        {levels.map((level) => {
          const isActive = level === activeLevel;
          const countSelected = available.filter(
            (sp) => sp.level === level && draft.spellIds.includes(sp.id)
          ).length;
          return (
            <button
              key={level}
              type="button"
              onClick={() => setRequestedLevel(level)}
              className={`focus-ring rounded-sm border px-3 py-1.5 font-data text-xs uppercase tracking-[0.08em] transition-colors ${
                isActive
                  ? 'border-gold-bright bg-gold/10 text-gold-bright'
                  : 'border-border-ember text-ink-dim hover:border-border-ember-bright hover:text-ink'
              }`}
            >
              {LEVEL_LABEL(level)}
              {countSelected > 0 && <span className="ml-1.5 text-emerald-bright">({countSelected})</span>}
            </button>
          );
        })}
      </nav>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {spellsForActiveLevel.map((spell) => (
          <SelectCard
            key={spell.id}
            eyebrow={spell.school}
            title={spell.name}
            description={spell.description}
            selected={draft.spellIds.includes(spell.id)}
            onClick={() => toggleSpell(spell.id)}
          />
        ))}
      </div>
    </div>
  );
}
