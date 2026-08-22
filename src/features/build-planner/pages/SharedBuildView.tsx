import { useParams, Link } from 'react-router-dom';
import { races } from '@/data/races';
import { classes } from '@/data/classes';
import { feats } from '@/data/feats';
import { spells } from '@/data/spells';
import { equipment } from '@/data/equipment';
import { ABILITY_LABELS, type AbilityKey, type Build } from '@/types/bg3';
import { decodeSharedBuild } from '@/features/build-planner/lib/shareBuild';
import { normalizeBuild } from '@/features/build-planner/lib/normalizeBuild';
import { finalScores, finalModifiers, baseArmorClass } from '@/features/build-planner/lib/buildCalculations';
import { Button } from '@/components/ui/Button';
import { useBuildStore } from '@/features/build-planner/store/buildStore';
import { useNavigate } from 'react-router-dom';

const ORDER: AbilityKey[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

export function SharedBuildView() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const loadDraft = useBuildStore((s) => s.loadDraft);
  const shared = code ? decodeSharedBuild(code) : null;

  if (!shared) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-ink-dim">Este link de build parece inválido ou corrompido.</p>
        <Link to="/build-planner" className="mt-4 inline-block text-gold-bright underline">
          Criar uma nova build
        </Link>
      </div>
    );
  }

  const build: Build = normalizeBuild({
    ...shared,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const race = races.find((r) => r.id === build.raceId);
  const subrace = race?.subraces?.find((s) => s.id === build.subraceId);
  const cls = classes.find((c) => c.id === build.classId);
  const subclass = cls?.subclasses.find((s) => s.id === build.subclassId);
  const scores = finalScores(build);
  const mods = finalModifiers(build);
  const ac = baseArmorClass(build);
  const chosenFeats = feats.filter((f) => build.featIds.includes(f.id));
  const featLabels = chosenFeats.map((f) => {
    if (!f.abilityChoice) return f.name;
    const chosen = build.featAbilityChoices[f.id] ?? [];
    if (chosen.length === 0) return f.name;
    const detail = chosen.map((a) => `${ABILITY_LABELS[a]} +${f.abilityChoice!.amount}`).join(', ');
    return `${f.name} (${detail})`;
  });
  const chosenSpells = spells.filter((s) => build.spellIds.includes(s.id));
  const chosenEquipment = equipment.filter((e) => build.equipmentIds.includes(e.id));

  function handleClone() {
    loadDraft({ ...build, id: crypto.randomUUID() });
    navigate('/build-planner');
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10 md:px-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-data text-[11px] uppercase tracking-[0.15em] text-ink-faint">
            Build compartilhada
          </span>
          <h1 className="rune-title text-2xl text-gold-bright">{build.name || 'Build sem nome'}</h1>
          <p className="mt-1 font-data text-sm text-ink-dim">
            Nível {build.level} · {race ? `${race.name}${subrace ? ` (${subrace.name})` : ''}` : '—'} ·{' '}
            {cls ? `${cls.name}${subclass ? ` — ${subclass.name}` : ''}` : '—'}
          </p>
        </div>
        <Button onClick={handleClone}>Copiar para minhas builds</Button>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {ORDER.map((key) => (
          <div key={key} className="parchment-panel rounded-sm p-3 text-center">
            <div className="font-data text-[10px] uppercase tracking-[0.1em] text-ink-faint">
              {ABILITY_LABELS[key]}
            </div>
            <div className="font-display text-2xl text-gold-bright">{scores[key]}</div>
            <div className="font-data text-xs text-ink-dim">
              {mods[key] >= 0 ? `+${mods[key]}` : mods[key]}
            </div>
          </div>
        ))}
      </div>

      <div className="parchment-panel rounded-sm p-4 text-center">
        <span className="font-data text-[11px] uppercase tracking-[0.15em] text-ink-faint">
          Classe de Armadura
        </span>
        <div className="font-display text-2xl text-gold-bright">{ac}</div>
      </div>

      <ShareList title="Talentos" items={featLabels} />
      <ShareList title="Magias" items={chosenSpells.map((s) => s.name)} />
      <ShareList title="Equipamentos" items={chosenEquipment.map((e) => e.name)} />
    </div>
  );
}

function ShareList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className="font-data text-xs uppercase tracking-[0.15em] text-ink-dim">{title}</h3>
      <ul className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-sm border border-border-ember bg-surface px-2.5 py-1 text-sm text-ink"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
