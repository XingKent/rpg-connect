import { spells } from '@/data/spells';
import { SelectCard } from '@/components/ui/SelectCard';
import { useBuildStore } from '@/store/buildStore';

export function SpellsStep() {
  const draft = useBuildStore((s) => s.draft);
  const toggleSpell = useBuildStore((s) => s.toggleSpell);

  const available = spells.filter((sp) => !draft.classId || sp.classes.includes(draft.classId));
  const levels = [...new Set(available.map((s) => s.level))].sort((a, b) => a - b);

  if (!draft.classId) {
    return (
      <div className="parchment-panel rounded-sm p-6 text-center text-sm text-ink-dim">
        Escolha uma classe primeiro para ver as magias disponíveis.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h2 className="rune-title text-xl text-gold-bright">Magias</h2>
        <p className="mt-1 text-sm text-ink-dim">
          Selecione as magias conhecidas ou preparadas pelo seu personagem.
        </p>
      </header>

      {levels.map((level) => (
        <div key={level}>
          <h3 className="font-data text-xs uppercase tracking-[0.15em] text-ink-dim">
            {level === 0 ? 'Truques' : `Nível ${level}`}
          </h3>
          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {available
              .filter((sp) => sp.level === level)
              .map((spell) => (
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
      ))}
    </div>
  );
}
