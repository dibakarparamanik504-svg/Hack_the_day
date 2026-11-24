import './pages/home.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Generate from './pages/generate';
import Explore from './pages/explore';
import Saved from './pages/saved';
import Tracker from './pages/tracker';
import Profile from './pages/profile';
import SmartCookingGuide from './pages/smart_feature/smartCookingGuide';
import VoiceAssistant from './pages/smart_feature/voiceAssistant';
import CookingProblemSolver from './pages/smart_feature/CookingProblemSolver';
import SmartNutritionAnalyzer from './pages/smart_feature/SmartNutritionAnalyzer';
import FoodSafetyAssistant from './pages/smart_feature/FoodSafetyAssistant';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/saved" element={<Saved/>}/>
          <Route path="/tracker" element={<Tracker/>}/>
          <Route path="*" element={<Profile />} />


          <Route path="/smart-cooking-guide" element={<SmartCookingGuide />} />
          <Route path="/voice-assistant" element={<VoiceAssistant />} />
          <Route path="/cooking-problem-solver" element={<CookingProblemSolver />} />
          <Route path="/smart-nutrition-analyzer" element={<SmartNutritionAnalyzer />} />
          <Route path="/food-safety-assistant" element={<FoodSafetyAssistant />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
