import { classes } from '@/data/classes';
import { SelectCard } from '@/components/ui/SelectCard';
import { Button } from '@/components/ui/Button';
import { useBuildStore } from '@/features/build-planner/store/buildStore';

export function ClassStep() {
  const draft = useBuildStore((s) => s.draft);
  const setClass = useBuildStore((s) => s.setClass);
  const clearClass = useBuildStore((s) => s.clearClass);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="rune-title text-xl text-gold-bright">Classe</h2>
          <p className="mt-1 text-sm text-ink-dim">
            Defina o caminho de combate e magia do seu personagem. A subclasse é escolhida na próxima etapa.
          </p>
        </div>
        {draft.classId && (
          <Button variant="ghost" onClick={clearClass}>
            Limpar seleção
          </Button>
        )}
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {classes.map((cls) => (
          <SelectCard
            key={cls.id}
            eyebrow={`Dado de vida d${cls.hitDie}`}
            title={cls.name}
            description={cls.description}
            selected={draft.classId === cls.id}
            onClick={() => setClass(cls.id)}
          />
        ))}
      </div>
    </div>
  );
}
