import React, { useState, useEffect } from "react";

const ConnectWalletButton = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0) setWalletAddress(accounts[0]);
        });
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected. Install it, web3 cowboy.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error("User rejected connection:", err);
    }
  };

  const truncateAddress = (address) =>
    address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  return (
    <button
      onClick={connectWallet}
      className="bg-[#9966ff] text-white font-bold py-2 px-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#a785ff] transition-all duration-150"
    >
      {walletAddress ? truncateAddress(walletAddress) : "Connect Wallet"}
    </button>
  );
};

export default ConnectWalletButton;