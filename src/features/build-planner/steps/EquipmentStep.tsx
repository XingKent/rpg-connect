import { equipment } from '@/data/equipment';
import { RARITY_LABELS } from '@/types/bg3';
import { SelectCard } from '@/components/ui/SelectCard';
import { useBuildStore } from '@/store/buildStore';

export function EquipmentStep() {
  const draft = useBuildStore((s) => s.draft);
  const toggleEquipment = useBuildStore((s) => s.toggleEquipment);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h2 className="rune-title text-xl text-gold-bright">Equipamentos</h2>
        <p className="mt-1 text-sm text-ink-dim">Monte o inventário inicial do seu personagem.</p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {equipment.map((item) => (
          <SelectCard
            key={item.id}
            eyebrow={RARITY_LABELS[item.rarity]}
            title={item.name}
            description={item.description}
            selected={draft.equipmentIds.includes(item.id)}
            onClick={() => toggleEquipment(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
