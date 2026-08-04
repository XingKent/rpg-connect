import { races } from '@/data/races';
import { SelectCard } from '@/components/ui/SelectCard';
import { Button } from '@/components/ui/Button';
import { useBuildStore } from '@/store/buildStore';

export function RaceStep() {
  const draft = useBuildStore((s) => s.draft);
  const setRace = useBuildStore((s) => s.setRace);
  const clearRace = useBuildStore((s) => s.clearRace);
  const selectedRace = races.find((r) => r.id === draft.raceId);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="rune-title text-xl text-gold-bright">Raça</h2>
          <p className="mt-1 text-sm text-ink-dim">Escolha a ascendência do seu personagem.</p>
        </div>
        {draft.raceId && (
          <Button variant="ghost" onClick={clearRace}>
            Limpar seleção
          </Button>
        )}
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {races.map((race) => (
          <SelectCard
            key={race.id}
            title={race.name}
            description={race.description}
            selected={draft.raceId === race.id}
            onClick={() => setRace(race.id, race.subraces?.[0]?.id)}
            footer={
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {race.traits.slice(0, 2).map((t) => (
                  <li
                    key={t}
                    className="rounded-sm border border-border-ember px-1.5 py-0.5 text-[11px] text-ink-faint"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            }
          />
        ))}
      </div>

      {selectedRace?.subraces && selectedRace.subraces.length > 0 && (
        <div>
          <h3 className="font-data text-xs uppercase tracking-[0.15em] text-ink-dim">Sublinhagem</h3>
          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {selectedRace.subraces.map((sub) => (
              <SelectCard
                key={sub.id}
                title={sub.name}
                description={sub.traits.join(' · ')}
                selected={draft.subraceId === sub.id}
                onClick={() => setRace(selectedRace.id, sub.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
