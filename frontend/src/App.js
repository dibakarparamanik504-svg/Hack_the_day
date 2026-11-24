import './pages/home.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Generate from './pages/generate';
import Explore from './pages/explore';
import Saved from './pages/saved';
import Tracker from './pages/tracker';
import Profile from './pages/profile';

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
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
