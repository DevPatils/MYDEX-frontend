// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import ConnectWalletButton from "./ConnectWallet";

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 border-b-4 border-black bg-white flex items-center justify-between shadow-[8px_8px_0px_rgba(0,0,0,1)]">
      <div className="text-3xl font-bold uppercase tracking-widest text-black border-b-2 border-black pb-2">
        💸 Swapzy
      </div>

      {/* Centered links with Neobrutalism style */}
      <div className="flex items-center ml-[18%] gap-12">
        <Link
          to="/"
          className="text-black font-semibold hover:text-white hover:bg-black py-1 px-4 border-2 border-black rounded-xl transition-all duration-200 transform hover:scale-105"
        >
          Faucet
        </Link>
        <Link
          to="/addliquidity"
          className="text-black font-semibold hover:text-white hover:bg-black py-1 px-4 border-2 border-black rounded-xl transition-all duration-200 transform hover:scale-105"
        >
          Add Liquidity
        </Link>
        <Link
          to="/removeLiquidity"
          className="text-black font-semibold hover:text-white hover:bg-black py-1 px-4 border-2 border-black rounded-xl transition-all duration-200 transform hover:scale-105"
        >
          Remove Liquidity
        </Link>
        <Link
          to="/swap"
          className="text-black font-semibold hover:text-white hover:bg-black py-1 px-4 border-2 border-black rounded-xl transition-all duration-200 transform hover:scale-105"
        >
          Swap
        </Link>
      </div>

      {/* Connect Wallet Button aligned to the right */}
      <div className="ml-auto">
        <ConnectWalletButton />
      </div>
    </nav>
  );
};

export default Navbar;
