import { HiddenEye } from '@/components/HiddenEye';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border-ember bg-surface/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-center font-data text-[11px] text-ink-faint md:px-6">
        <p>
          Baldur's Gate 3 é uma marca da Larian Studios. Este é um projeto de fã, sem afiliação oficial
          <HiddenEye />
        </p>
        <p>
          Dados de magias e itens combinam o{' '}
          <a
            href="https://open5e.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-dim underline decoration-border-ember-bright underline-offset-2 hover:text-gold-bright"
          >
            SRD de D&D 5e (Open5e)
          </a>{' '}
          com referências específicas do{' '}
          <a
            href="https://bg3.wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-dim underline decoration-border-ember-bright underline-offset-2 hover:text-gold-bright"
          >
            bg3.wiki
          </a>
          , marcadas com o selo{' '}
          <span className="rounded-sm border border-gold-bright/50 bg-gold/10 px-1 py-0.5 text-gold-bright">
            BG3
          </span>
          .
        </p>
      </div>
    </footer>
  );
}
