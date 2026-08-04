import type { AbilityKey } from '@/types/bg3';
import { AbilityGauge } from '@/components/AbilityGauge';
import { Button } from '@/components/ui/Button';
import { useBuildStore } from '@/store/buildStore';
import { canDecrease, canIncrease, pointsRemaining, POINT_BUY_BUDGET } from '@/lib/pointBuy';
import { racialBonuses } from '@/lib/buildCalculations';

const ORDER: AbilityKey[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

export function AbilitiesStep() {
  const draft = useBuildStore((s) => s.draft);
  const increaseAbility = useBuildStore((s) => s.increaseAbility);
  const decreaseAbility = useBuildStore((s) => s.decreaseAbility);
  const resetAbilities = useBuildStore((s) => s.resetAbilities);
  const applyRecommendedAbilities = useBuildStore((s) => s.applyRecommendedAbilities);
  const remaining = pointsRemaining(draft.abilityScores);
  const bonuses = racialBonuses(draft);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="rune-title text-xl text-gold-bright">Atributos</h2>
          <p className="mt-1 text-sm text-ink-dim">
            Distribua pontos entre os seis atributos (sistema de compra por pontos). Ao escolher uma classe,
            uma distribuição recomendada é aplicada automaticamente — ajuste como preferir.
          </p>
        </div>
        <div className="parchment-panel rounded-sm px-4 py-2 text-right">
          <div className="font-data text-2xl text-gold-bright">{remaining}</div>
          <div className="font-data text-[11px] uppercase tracking-[0.15em] text-ink-faint">
            de {POINT_BUY_BUDGET} pontos
          </div>
        </div>
      </header>

      <div className="flex flex-wrap gap-3">
        <Button variant="ghost" onClick={applyRecommendedAbilities} disabled={!draft.classId}>
          Usar recomendação da classe
        </Button>
        <Button variant="ghost" onClick={resetAbilities}>
          Limpar seleção
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ORDER.map((key) => (
          <AbilityGauge
            key={key}
            abilityKey={key}
            score={draft.abilityScores[key]}
            racialBonus={bonuses[key] ?? 0}
            canIncrease={canIncrease(draft.abilityScores, key)}
            canDecrease={canDecrease(draft.abilityScores, key)}
            onIncrease={() => increaseAbility(key)}
            onDecrease={() => decreaseAbility(key)}
          />
        ))}
      </div>
    </div>
  );
}
