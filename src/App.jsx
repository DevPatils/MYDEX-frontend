// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Faucet from "./Components/Faucet";
import Navbar from "./Components/Navbar";
import AddLiquidity from "./Components/AddLiquidity";
import RemoveLiquidity from "./Components/RemoveLiquidity";
import Swap from "./Components/Swap";
import Home from "./Components/Home";


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
       <Route path="/" element={<Home/>} />
        <Route path="/faucet" element={<Faucet />} />
        <Route path="/addliquidity" element={<AddLiquidity/>} />
        <Route path="/removeLiquidity" element={<RemoveLiquidity/>} />
        <Route path="/swap" element={<Swap/>} />
        


        {/* Later if you have more pages, just add more <Route> here */}
      </Routes>
    </Router>
  );
}
