// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Faucet from "./Components/Faucet";
import Navbar from "./Components/Navbar";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Faucet />} />
        {/* Later if you have more pages, just add more <Route> here */}
      </Routes>
    </Router>
  );
}