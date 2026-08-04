import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { SavedBuilds } from '@/pages/SavedBuilds';
import { SharedBuildView } from '@/pages/SharedBuildView';
import { BuildPlanner } from '@/features/build-planner/BuildPlanner';

function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  if (isHome) return null;
  return (
    <header className="border-b border-border-ember bg-surface/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="rune-title text-sm tracking-widest text-gold-bright">
          BG3 COMPANION
        </Link>
        <nav className="flex gap-4 font-data text-xs uppercase tracking-[0.1em] text-ink-dim">
          <Link to="/build-planner" className="hover:text-gold-bright">
            Build Planner
          </Link>
          <Link to="/builds" className="hover:text-gold-bright">
            Minhas builds
          </Link>
        </nav>
      </div>
    </header>
  );
}

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build-planner" element={<BuildPlanner />} />
        <Route path="/builds" element={<SavedBuilds />} />
        <Route path="/build/:code" element={<SharedBuildView />} />
      </Routes>
    </div>
  );
}

export default App;
