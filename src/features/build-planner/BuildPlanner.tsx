import { useState, type ComponentType } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StepRail, type StepDef } from '@/components/StepRail';
import { useBuildStore } from '@/store/buildStore';
import { buildCompleteness } from '@/lib/buildCalculations';
import { Button } from '@/components/ui/Button';
import { RaceStep } from './steps/RaceStep';
import { ClassStep } from './steps/ClassStep';
import { SubclassStep } from './steps/SubclassStep';
import { AbilitiesStep } from './steps/AbilitiesStep';
import { FeatsStep } from './steps/FeatsStep';
import { SpellsStep } from './steps/SpellsStep';
import { EquipmentStep } from './steps/EquipmentStep';
import { SummaryStep } from './steps/SummaryStep';

const STEP_KEYS = [
  'race',
  'class',
  'subclass',
  'abilities',
  'feats',
  'spells',
  'equipment',
  'summary',
] as const;
type StepKey = (typeof STEP_KEYS)[number];

const STEP_COMPONENTS: Record<StepKey, ComponentType> = {
  race: RaceStep,
  class: ClassStep,
  subclass: SubclassStep,
  abilities: AbilitiesStep,
  feats: FeatsStep,
  spells: SpellsStep,
  equipment: EquipmentStep,
  summary: SummaryStep,
};

const STEP_LABELS: Record<StepKey, string> = {
  race: 'Raça',
  class: 'Classe',
  subclass: 'Subclasse',
  abilities: 'Atributos',
  feats: 'Talentos',
  spells: 'Magias',
  equipment: 'Equipamentos',
  summary: 'Resumo',
};

export function BuildPlanner() {
  const [active, setActive] = useState<StepKey>('race');
  const draft = useBuildStore((s) => s.draft);
  const resetDraft = useBuildStore((s) => s.resetDraft);
  const completeness = buildCompleteness(draft);

  const steps: StepDef[] = STEP_KEYS.map((key) => ({
    key,
    label: STEP_LABELS[key],
    complete: key === 'summary' ? false : (completeness as Record<string, boolean>)[key],
  }));

  const activeIndex = STEP_KEYS.indexOf(active);
  const ActiveComponent = STEP_COMPONENTS[active];

  function goTo(index: number) {
    if (index < 0 || index >= STEP_KEYS.length) return;
    setActive(STEP_KEYS[index]);
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
      !window.confirm('Começar uma nova build vai limpar todos os campos preenchidos. Continuar?')
    ) {
      return;
    }
    resetDraft();
    setActive('race');
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row md:gap-10 md:px-6 md:py-12">
      <aside className="md:w-56 md:shrink-0">
        <div className="mb-4 hidden md:block">
          <h1 className="rune-title text-lg text-ink">Build Planner</h1>
          <p className="mt-1 text-xs text-ink-faint">Construa seu personagem passo a passo.</p>
        </div>
        <div className="mb-4">
          <Button variant="ghost" className="w-full" onClick={handleNewBuild}>
            + Nova build
          </Button>
        </div>
        <StepRail steps={steps} activeKey={active} onSelect={(key) => setActive(key as StepKey)} />
      </aside>

      <section className="min-w-0 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between border-t border-border-ember pt-6">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="focus-ring rounded-sm px-4 py-2 text-sm text-ink-dim hover:text-gold-bright disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Voltar
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === STEP_KEYS.length - 1}
            className="focus-ring rounded-sm px-4 py-2 text-sm text-ink-dim hover:text-gold-bright disabled:cursor-not-allowed disabled:opacity-30"
          >
            Avançar →
          </button>
        </div>
      </section>
    </div>
  );
}
