import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Home } from '@/pages/Home';
import { SavedBuilds } from '@/features/build-planner/pages/SavedBuilds';
import { SharedBuildView } from '@/features/build-planner/pages/SharedBuildView';
import { BuildPlanner } from '@/features/build-planner/BuildPlanner';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
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
