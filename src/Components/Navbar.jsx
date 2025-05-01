import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConnectWalletButton from "./ConnectWallet";
import { Menu, X } from "lucide-react"; // Make sure lucide-react is installed

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to close the menu on link click (for mobile)
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full px-6 py-4 border-b-4 border-black bg-white flex items-center justify-between shadow-[8px_8px_0px_rgba(0,0,0,1)] flex-wrap">
      {/* Logo */}
      <div className="text-3xl font-bold uppercase tracking-widest text-black">
        💸 Swapzy
      </div>

      {/* Hamburger icon for mobile */}
      <div className="lg:hidden ml-auto">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden lg:flex items-center ml-[18%] gap-12">
        <Link
          to="/faucet"
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

      {/* Desktop Wallet Button */}
      <div className="hidden lg:block ml-auto">
        <ConnectWalletButton />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="w-full flex flex-col gap-4 mt-4 lg:hidden">
          <Link
            to="/faucet"
            className="text-black font-semibold border-2 border-black py-2 px-4 rounded-xl text-center"
            onClick={handleLinkClick} // Close menu after click
          >
            Faucet
          </Link>
          <Link
            to="/addliquidity"
            className="text-black font-semibold border-2 border-black py-2 px-4 rounded-xl text-center"
            onClick={handleLinkClick} // Close menu after click
          >
            Add Liquidity
          </Link>
          <Link
            to="/removeLiquidity"
            className="text-black font-semibold border-2 border-black py-2 px-4 rounded-xl text-center"
            onClick={handleLinkClick} // Close menu after click
          >
            Remove Liquidity
          </Link>
          <Link
            to="/swap"
            className="text-black font-semibold border-2 border-black py-2 px-4 rounded-xl text-center"
            onClick={handleLinkClick} // Close menu after click
          >
            Swap
          </Link>
          <div className="flex justify-center">
            <ConnectWalletButton />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
