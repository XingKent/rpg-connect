import { useNavigate } from 'react-router-dom';
import { races } from '@/data/races';
import { classes } from '@/data/classes';
import { useBuildStore } from '@/features/build-planner/store/buildStore';
import { Button } from '@/components/ui/Button';

export function SavedBuilds() {
  const savedBuilds = useBuildStore((s) => s.savedBuilds);
  const loadDraft = useBuildStore((s) => s.loadDraft);
  const deleteBuild = useBuildStore((s) => s.deleteBuild);
  const resetDraft = useBuildStore((s) => s.resetDraft);
  const draft = useBuildStore((s) => s.draft);
  const navigate = useNavigate();

  function handleEdit(id: string) {
    const build = savedBuilds.find((b) => b.id === id);
    if (build) loadDraft(build);
    navigate('/build-planner');
  }

  function handleNewBuild() {
    const hasProgress =
      draft.name ||
      draft.raceId ||
      draft.classId ||
      draft.featIds.length > 0 ||
      draft.equipmentIds.length > 0;
    if (
      hasProgress &&
      !window.confirm('Começar uma nova build vai limpar os campos preenchidos. Continuar?')
    ) {
      return;
    }
    resetDraft();
    navigate('/build-planner');
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10 md:px-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="rune-title text-xl text-gold-bright">Builds salvas</h1>
          <p className="mt-1 text-sm text-ink-dim">Suas builds ficam guardadas neste dispositivo.</p>
        </div>
        <Button onClick={handleNewBuild}>Nova build</Button>
      </header>

      {savedBuilds.length === 0 ? (
        <div className="parchment-panel rounded-sm p-8 text-center text-sm text-ink-dim">
          Nenhuma build salva ainda. Comece uma no Build Planner.
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {savedBuilds.map((build) => {
            const race = races.find((r) => r.id === build.raceId);
            const cls = classes.find((c) => c.id === build.classId);
            return (
              <li
                key={build.id}
                className="parchment-panel flex flex-wrap items-center justify-between gap-4 rounded-sm p-4"
              >
                <div>
                  <div className="rune-title text-base text-ink">{build.name || 'Build sem nome'}</div>
                  <div className="font-data text-xs text-ink-dim">
                    Nível {build.level} · {race?.name ?? '-'} · {cls?.name ?? '-'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => handleEdit(build.id)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => deleteBuild(build.id)}>
                    Excluir
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
