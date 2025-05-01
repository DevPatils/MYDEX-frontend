// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Faucet from "./Components/Faucet";
import Navbar from "./Components/Navbar";
import AddLiquidity from "./Components/AddLiquidity";
import RemoveLiquidity from "./Components/RemoveLiquidity";
import Swap from "./Components/Swap";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Faucet />} />
        <Route path="/addliquidity" element={<AddLiquidity></AddLiquidity>} />
        <Route path="/removeLiquidity" element={<RemoveLiquidity></RemoveLiquidity>} />
        <Route path="/swap" element={<Swap/>} />

        {/* Later if you have more pages, just add more <Route> here */}
      </Routes>
    </Router>
  );
}
