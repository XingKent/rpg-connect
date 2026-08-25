import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function Home() {
  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-4xl flex-col items-center justify-center px-4 py-16 text-center md:px-6">
      <span className="font-data text-xs uppercase tracking-[0.3em] text-gold-dim">BG3 Companion</span>
      <h1 className="rune-title mt-4 text-4xl text-ink md:text-5xl">
        Forje sua <span className="text-gold-bright">build</span> antes da aventura
      </h1>
      <p className="mt-4 max-w-xl text-ink-dim">
        Escolha raça, classe, atributos, talentos, magias e equipamentos. Depois compartilhe sua build com um
        link, como um selo de cera em um pergaminho.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/build-planner">
          <Button>Criar build</Button>
        </Link>
        <Link to="/builds">
          <Button variant="ghost">Ver builds salvas</Button>
        </Link>
      </div>
    </div>
  );
}
