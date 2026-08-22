import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Lock } from 'lucide-react';
import { roadmap, TOTAL_PARTS, DONE_PARTS } from '@/config/roadmap';

const STATUS_LABEL: Record<string, string> = {
  done: 'Pronto',
  current: 'Em construção',
  planned: 'Em breve',
};

const STATUS_CLASSES: Record<string, string> = {
  done: 'border-emerald-bright/40 bg-emerald/10 text-emerald-bright',
  current: 'border-gold-bright/50 bg-gold/10 text-gold-bright',
  planned: 'border-border-ember bg-transparent text-ink-faint',
};

function RoadmapDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div className="parchment-panel absolute right-0 top-[calc(100%+0.5rem)] z-20 w-[min(22rem,90vw)] rounded-sm p-2">
      <div className="px-2 py-1.5">
        <span className="font-data text-[11px] uppercase tracking-[0.15em] text-ink-faint">
          Roteiro do projeto · {TOTAL_PARTS} partes
        </span>
      </div>
      <ul className="flex flex-col gap-0.5">
        {roadmap.map((item) => {
          const Icon = item.icon;
          const clickable = Boolean(item.path);
          const content = (
            <div className="flex items-start gap-3 rounded-sm px-2 py-2 transition-colors duration-150">
              <span
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                  item.status === 'planned'
                    ? 'border-border-ember text-ink-faint'
                    : 'border-gold-dim text-gold-bright'
                }`}
              >
                {item.status === 'planned' ? <Lock size={13} /> : <Icon size={14} />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-data text-[10px] text-ink-faint">{item.order}.</span>
                  <span
                    className={`rune-title text-sm ${
                      item.status === 'planned' ? 'text-ink-dim' : 'text-ink'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`rounded-sm border px-1.5 py-0.5 font-data text-[10px] uppercase tracking-[0.08em] ${STATUS_CLASSES[item.status]}`}
                  >
                    {STATUS_LABEL[item.status]}
                  </span>
                </div>
                <p className="mt-0.5 text-xs leading-snug text-ink-faint">{item.description}</p>
              </div>
            </div>
          );

          return (
            <li key={item.id}>
              {clickable ? (
                <Link
                  to={item.path!}
                  onClick={onClose}
                  className="focus-ring block rounded-sm hover:bg-surface-raised"
                >
                  {content}
                </Link>
              ) : (
                <div aria-disabled className="cursor-not-allowed opacity-70">
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Navbar() {
  const location = useLocation();
  const [roadmapOpen, setRoadmapOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setRoadmapOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setRoadmapOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  if (location.pathname === '/') return null;

  const isBuildPlanner = location.pathname.startsWith('/build-planner');
  const isSavedBuilds = location.pathname === '/builds';
  const isAchievementTracker = location.pathname === '/achievement-tracker';

  return (
    <header className="sticky top-0 z-10 border-b border-border-ember bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="rune-title shrink-0 text-sm tracking-widest text-gold-bright">
          BG3 COMPANION
        </Link>

        <nav className="flex items-center gap-1 font-data text-xs uppercase tracking-[0.1em]">
          <Link
            to="/build-planner"
            className={`focus-ring rounded-sm px-2.5 py-1.5 transition-colors ${
              isBuildPlanner ? 'text-gold-bright' : 'text-ink-dim hover:text-gold-bright'
            }`}
          >
            Build Planner
          </Link>
          <Link
            to="/builds"
            className={`focus-ring rounded-sm px-2.5 py-1.5 transition-colors ${
              isSavedBuilds ? 'text-gold-bright' : 'text-ink-dim hover:text-gold-bright'
            }`}
          >
            Minhas builds
          </Link>
          <Link
            to="/achievement-tracker"
            className={`focus-ring rounded-sm px-2.5 py-1.5 transition-colors ${
              isAchievementTracker ? 'text-gold-bright' : 'text-ink-dim hover:text-gold-bright'
            }`}
          >
            Achievements
          </Link>

          <div className="relative ml-1" ref={containerRef}>
            <button
              type="button"
              onClick={() => setRoadmapOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={roadmapOpen}
              className="focus-ring flex items-center gap-1.5 rounded-sm border border-border-ember px-2.5 py-1.5 text-ink-dim transition-colors hover:border-gold-dim hover:text-gold-bright"
            >
              <span>Roteiro</span>
              <span className="text-gold-dim">
                {DONE_PARTS}/{TOTAL_PARTS}
              </span>
              <ChevronDown size={13} className={`transition-transform ${roadmapOpen ? 'rotate-180' : ''}`} />
            </button>
            {roadmapOpen && <RoadmapDropdown onClose={() => setRoadmapOpen(false)} />}
          </div>
        </nav>
      </div>
    </header>
  );
}
