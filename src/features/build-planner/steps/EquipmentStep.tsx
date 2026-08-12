import { useMemo, useState } from 'react';
import { equipment } from '@/data/equipment';
import {
  RARITY_LABELS,
  EQUIPMENT_STAT_LABELS,
  EQUIPMENT_ACTION_TYPE_LABELS,
  EQUIPMENT_ACTION_COOLDOWN_LABELS,
  type Equipment,
} from '@/types/bg3';
import { SelectCard } from '@/components/ui/SelectCard';
import { SourceBadge } from '@/components/ui/SourceBadge';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { Pagination } from '@/components/ui/Pagination';
import { useBuildStore } from '@/features/build-planner/store/buildStore';

const PAGE_SIZE = 6;

function formatStat(stat: Equipment['stats'][number]): string {
  const label = EQUIPMENT_STAT_LABELS[stat.type];
  if (typeof stat.value === 'number') {
    const sign = stat.value >= 0 ? '+' : '';
    return `${label} ${sign}${stat.value}`;
  }
  return `${label}: ${stat.value}`;
}

function EquipmentMeta({ item }: { item: Equipment }) {
  return (
    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-data text-[11px] text-ink-faint">
      <span>Ato {item.act}</span>
      <span>{item.weight} kg</span>
      <span>{item.value} de ouro</span>
      <span className="italic">{item.location}</span>
    </div>
  );
}

export function EquipmentStep() {
  const draft = useBuildStore((s) => s.draft);
  const toggleEquipment = useBuildStore((s) => s.toggleEquipment);
  const clearEquipment = useBuildStore((s) => s.clearEquipment);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return equipment;
    return equipment.filter((item) => {
      const haystack = [item.name, item.description, item.location, ...(item.bestFor ?? [])]
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="rune-title text-xl text-gold-bright">Equipamentos</h2>
          <p className="mt-1 text-sm text-ink-dim">Monte o inventário inicial do seu personagem.</p>
        </div>
        {draft.equipmentIds.length > 0 && (
          <Button variant="ghost" onClick={clearEquipment}>
            Limpar seleção
          </Button>
        )}
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <div className="w-full max-w-xs">
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar por nome, local, sinergia..."
            aria-label="Buscar equipamento"
          />
        </div>
        <span className="font-data text-xs text-ink-faint">
          {filtered.length} {filtered.length === 1 ? 'item' : 'itens'}
        </span>
      </div>

      {pageItems.length === 0 ? (
        <div className="parchment-panel rounded-sm p-6 text-center text-sm text-ink-dim">
          Nenhum equipamento encontrado para "{search}".
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {pageItems.map((item) => (
            <SelectCard
              key={item.id}
              eyebrow={RARITY_LABELS[item.rarity]}
              title={item.name}
              titleBadge={<SourceBadge source={item.source} />}
              description={item.description}
              selected={draft.equipmentIds.includes(item.id)}
              onClick={() => toggleEquipment(item.id)}
              footer={
                <div>
                  {item.stats.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {item.stats.map((stat, i) => (
                        <li
                          key={i}
                          className="rounded-sm border border-emerald-bright/40 bg-emerald/10 px-1.5 py-0.5 text-[11px] text-emerald-bright"
                        >
                          {formatStat(stat)}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.actions && item.actions.length > 0 && (
                    <ul className="mt-1.5 flex flex-col gap-1">
                      {item.actions.map((action) => (
                        <li key={action.name} className="text-[11px] text-ink-dim">
                          <span className="text-gold-dim">
                            {EQUIPMENT_ACTION_TYPE_LABELS[action.type]} ·{' '}
                            {EQUIPMENT_ACTION_COOLDOWN_LABELS[action.cooldown]}:
                          </span>{' '}
                          {action.name} — {action.description}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.bestFor && item.bestFor.length > 0 && (
                    <div className="mt-1.5 text-[11px] text-ink-faint">
                      Ideal para: <span className="text-ink-dim">{item.bestFor.join(', ')}</span>
                    </div>
                  )}
                  <EquipmentMeta item={item} />
                </div>
              }
            />
          ))}
        </div>
      )}

      <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
