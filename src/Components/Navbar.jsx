// src/components/Navbar.jsx
import React from "react";
import ConnectWalletButton from "./ConnectWallet";

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 border-b-4 border-black bg-white flex justify-between items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="text-2xl font-bold uppercase tracking-widest text-black">
        💸 Token Drop
      </div>

      <div className="ml-auto">
        <ConnectWalletButton />
      </div>
    </nav>
  );
};

export default Navbar;
