import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { races } from '@/data/races';
import { classes } from '@/data/classes';
import { feats } from '@/data/feats';
import { spells } from '@/data/spells';
import { equipment } from '@/data/equipment';
import { ABILITY_LABELS, type AbilityKey } from '@/types/bg3';
import { useBuildStore } from '@/features/build-planner/store/buildStore';
import { finalScores, finalModifiers, baseArmorClass } from '@/features/build-planner/lib/buildCalculations';
import { encodeBuildForShare } from '@/features/build-planner/lib/shareBuild';
import { Button } from '@/components/ui/Button';

const ORDER: AbilityKey[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

export function SummaryStep() {
  const draft = useBuildStore((s) => s.draft);
  const setName = useBuildStore((s) => s.setName);
  const saveDraft = useBuildStore((s) => s.saveDraft);
  const navigate = useNavigate();
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const race = races.find((r) => r.id === draft.raceId);
  const subrace = race?.subraces?.find((s) => s.id === draft.subraceId);
  const cls = classes.find((c) => c.id === draft.classId);
  const subclass = cls?.subclasses.find((s) => s.id === draft.subclassId);
  const scores = finalScores(draft);
  const mods = finalModifiers(draft);
  const ac = baseArmorClass(draft);

  const chosenFeats = feats.filter((f) => draft.featIds.includes(f.id));
  const featLabels = chosenFeats.map((f) => {
    if (!f.abilityChoice) return f.name;
    const chosen = draft.featAbilityChoices[f.id] ?? [];
    if (chosen.length === 0) return f.name;
    const detail = chosen.map((a) => `${ABILITY_LABELS[a]} +${f.abilityChoice!.amount}`).join(', ');
    return `${f.name} (${detail})`;
  });
  const chosenSpells = spells.filter((s) => draft.spellIds.includes(s.id));
  const chosenEquipment = equipment.filter((e) => draft.equipmentIds.includes(e.id));

  function handleSave() {
    saveDraft();
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2500);
  }

  function handleShare() {
    const saved = saveDraft();
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2500);
    const code = encodeBuildForShare(saved);
    const url = `${window.location.origin}/build/${code}`;
    setShareUrl(url);
  }

  async function handleCopy() {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h2 className="rune-title text-xl text-gold-bright">Resumo</h2>
        <p className="mt-1 text-sm text-ink-dim">Revise, salve e compartilhe sua build.</p>
      </header>

      <div className="parchment-panel rounded-sm p-5">
        <label
          className="font-data text-[11px] uppercase tracking-[0.15em] text-ink-faint"
          htmlFor="build-name"
        >
          Nome da build
        </label>
        <input
          id="build-name"
          value={draft.name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ex.: Moon Druid"
          className="focus-ring mt-2 w-full rounded-sm border border-border-ember bg-surface-inset px-3 py-2 font-display text-lg text-ink placeholder:text-ink-faint"
        />

        <div className="mt-4 grid grid-cols-2 gap-2 font-data text-sm text-ink-dim sm:grid-cols-5">
          <div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-ink-faint">Nível</div>
            <div className="text-gold-bright">{draft.level}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-ink-faint">Raça</div>
            <div className="text-ink">
              {race ? `${race.name}${subrace ? ` (${subrace.name})` : ''}` : '—'}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-ink-faint">Classe</div>
            <div className="text-ink">
              {cls ? `${cls.name}${subclass ? ` — ${subclass.name}` : ''}` : '—'}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-ink-faint">Classe de Armadura</div>
            <div className="text-gold-bright">{ac}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-ink-faint">Dado de vida</div>
            <div className="text-ink">{cls ? `d${cls.hitDie}` : '—'}</div>
          </div>
        </div>
      </div>

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

      <SummaryList title="Talentos" items={featLabels} />
      <SummaryList title="Magias" items={chosenSpells.map((s) => s.name)} />
      <SummaryList title="Equipamentos" items={chosenEquipment.map((e) => e.name)} />

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleSave} disabled={!draft.name || !draft.raceId || !draft.classId}>
          {justSaved ? 'Build salva ✓' : 'Salvar build'}
        </Button>
        <Button
          variant="ghost"
          onClick={handleShare}
          disabled={!draft.name || !draft.raceId || !draft.classId}
        >
          Compartilhar por link
        </Button>
        <Button variant="ghost" onClick={() => navigate('/builds')}>
          Ver builds salvas
        </Button>
        {justSaved && (
          <span role="status" className="font-data text-xs text-emerald-bright">
            Sua build foi salva neste dispositivo.
          </span>
        )}
      </div>

      {shareUrl && (
        <div className="parchment-panel flex flex-wrap items-center justify-between gap-3 rounded-sm p-3">
          <code className="break-all font-data text-xs text-ink-dim">{shareUrl}</code>
          <Button variant="ghost" onClick={handleCopy}>
            {copied ? 'Copiado ✓' : 'Copiar link'}
          </Button>
        </div>
      )}
    </div>
  );
}

function SummaryList({ title, items }: { title: string; items: string[] }) {
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
