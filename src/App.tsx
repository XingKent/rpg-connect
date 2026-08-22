import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DiceRoller } from '@/components/DiceRoller';
import { Home } from '@/pages/Home';
import { SavedBuilds } from '@/features/build-planner/pages/SavedBuilds';
import { SharedBuildView } from '@/features/build-planner/pages/SharedBuildView';
import { BuildPlanner } from '@/features/build-planner/BuildPlanner';
import { AchievementTracker } from '@/features/achievement-tracker/AchievementTracker';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/build-planner" element={<BuildPlanner />} />
          <Route path="/builds" element={<SavedBuilds />} />
          <Route path="/build/:code" element={<SharedBuildView />} />
          <Route path="/achievement-tracker" element={<AchievementTracker />} />
        </Routes>
      </div>
      <Footer />
      <DiceRoller />
    </div>
  );
}

export default App;
