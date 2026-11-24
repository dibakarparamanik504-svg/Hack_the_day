import "./pages/home.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Generate from "./pages/generate";
import Explore from "./pages/explore";
import Saved from "./pages/saved";
import Tracker from "./pages/tracker";
import Profile from "./pages/profile";
import SmartCookingGuide from "./pages/smart_feature/smartCookingGuide";
import VoiceAssistant from "./pages/smart_feature/voiceAssistant";
import CookingProblemSolver from "./pages/smart_feature/CookingProblemSolver";
import SmartNutritionAnalyzer from "./pages/smart_feature/SmartNutritionAnalyzer";
import FoodSafetyAssistant from "./pages/smart_feature/FoodSafetyAssistant";
import Header from "./header";
import Footer from "./footer";
import { useState } from "react";

function App() {
  let [name,setname]=useState("");
  return (
    <div className="App">
      <BrowserRouter>
        <div><Header/></div>
        <div>
          <Routes>
            <Route path="/" element={<Home setname={setname}/>} />
            <Route path="/generate" element={<Generate setname={setname}/>} />
            <Route path="/explore" element={<Explore setname={setname}/>} />
            <Route path="/saved" element={<Saved setname={setname}/>} />
            <Route path="/tracker" element={<Tracker setname={setname}/>} />
            <Route path="/profile" element={<Profile setname={setname}/>} />

            <Route
              path="/smart-cooking-guide"
              element={<SmartCookingGuide />}
            />
            <Route path="/voice-assistant" element={<VoiceAssistant />} />
            <Route
              path="/cooking-problem-solver"
              element={<CookingProblemSolver />}
            />
            <Route
              path="/smart-nutrition-analyzer"
              element={<SmartNutritionAnalyzer />}
            />
            <Route
              path="/food-safety-assistant"
              element={<FoodSafetyAssistant />}
            />
          </Routes>
        </div>
        <div><Footer name={name}/></div>
      </BrowserRouter>
    </div>
  );
}

export default App;
