import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ItineraryPage from "./pages/ItineraryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/planner" element={<HomePage />} />
      <Route path="/itinerary" element={<ItineraryPage />} />
    </Routes>
  );
}

export default App;
