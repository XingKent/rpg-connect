import { classes } from '@/data/classes';
import { SelectCard } from '@/components/ui/SelectCard';
import { Button } from '@/components/ui/Button';
import { useBuildStore } from '@/features/build-planner/store/buildStore';

export function SubclassStep() {
  const draft = useBuildStore((s) => s.draft);
  const setSubclass = useBuildStore((s) => s.setSubclass);
  const clearSubclass = useBuildStore((s) => s.clearSubclass);
  const selectedClass = classes.find((c) => c.id === draft.classId);

  if (!selectedClass) {
    return (
      <div className="parchment-panel rounded-sm p-6 text-center text-sm text-ink-dim">
        Escolha uma classe primeiro para ver as subclasses disponíveis.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="rune-title text-xl text-gold-bright">Subclasse</h2>
          <p className="mt-1 text-sm text-ink-dim">Especialize seu {selectedClass.name} com uma subclasse.</p>
        </div>
        {draft.subclassId && (
          <Button variant="ghost" onClick={clearSubclass}>
            Limpar seleção
          </Button>
        )}
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {selectedClass.subclasses.map((sub) => (
          <SelectCard
            key={sub.id}
            eyebrow={`Disponível no nível ${sub.levelAvailable}`}
            title={sub.name}
            description={sub.description}
            selected={draft.subclassId === sub.id}
            onClick={() => setSubclass(sub.id)}
          />
        ))}
      </div>
    </div>
  );
}
