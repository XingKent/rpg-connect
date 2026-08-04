import { classes } from '@/data/classes';
import { SelectCard } from '@/components/ui/SelectCard';
import { useBuildStore } from '@/store/buildStore';

export function ClassStep() {
  const draft = useBuildStore((s) => s.draft);
  const setClass = useBuildStore((s) => s.setClass);
  const selectedClass = classes.find((c) => c.id === draft.classId);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h2 className="rune-title text-xl text-gold-bright">Classe</h2>
        <p className="mt-1 text-sm text-ink-dim">Defina o caminho de combate e magia do seu personagem.</p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {classes.map((cls) => (
          <SelectCard
            key={cls.id}
            eyebrow={`Dado de vida d${cls.hitDie}`}
            title={cls.name}
            description={cls.description}
            selected={draft.classId === cls.id}
            onClick={() => setClass(cls.id, cls.subclasses[0]?.id)}
          />
        ))}
      </div>

      {selectedClass && (
        <div>
          <h3 className="font-data text-xs uppercase tracking-[0.15em] text-ink-dim">Subclasse</h3>
          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {selectedClass.subclasses.map((sub) => (
              <SelectCard
                key={sub.id}
                eyebrow={`Disponível no nível ${sub.levelAvailable}`}
                title={sub.name}
                description={sub.description}
                selected={draft.subclassId === sub.id}
                onClick={() => setClass(selectedClass.id, sub.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
