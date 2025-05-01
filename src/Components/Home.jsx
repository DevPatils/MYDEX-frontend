import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f2f2f2] text-black p-8 font-mono">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Title Section */}
        <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-2xl">
          <h1 className="text-5xl font-bold">Swapzy</h1>
          <p className="mt-2 text-lg">Decentralized token exchange, minimal, no-BS DEX.</p>
        </div>

        {/* Flow Explanation */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Swap Tokens */}
          <div className="bg-[#ffe66d] p-6 border-4 border-black shadow-[6px_6px_0px_0px_#000] rounded-2xl">
            <h2 className="text-2xl font-bold mb-2">🔁 Swap</h2>
            <p>Trade Token X for Y (or vice versa) instantly using our liquidity pools.</p>
          </div>

          {/* Add Liquidity */}
          <div className="bg-[#ff6b6b] p-6 border-4 border-black shadow-[6px_6px_0px_0px_#000] rounded-2xl">
            <h2 className="text-2xl font-bold mb-2">➕ Add Liquidity</h2>
            <p>Provide Token X and Y to earn a share of swap fees. Be the house.</p>
          </div>

          {/* Remove Liquidity */}
          <div className="bg-[#70d6ff] p-6 border-4 border-black shadow-[6px_6px_0px_0px_#000] rounded-2xl">
            <h2 className="text-2xl font-bold mb-2">➖ Remove Liquidity</h2>
            <p>Pull out your liquidity anytime and reclaim your tokens + rewards.</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex gap-4 mt-4">
          <Link
            to="/faucet"
            className="bg-black text-white px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-white hover:text-black transition-all rounded-xl"
          >
            Get Started
          </Link>
          <Link
            to="/swap"
            className="bg-transparent px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-black hover:text-white transition-all rounded-xl"
          >
            Swap
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
