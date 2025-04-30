// src/Faucet.jsx
import { useState, useEffect } from "react";
import { ethers } from "ethers";

const FAUCET_ADDRESS = "0x4df2953897D9f973766a5daaBfAaE24B2DcC6977";
const faucetAbi = [
  "function claimTokenx() external",
  "function claimTokeny() external",
];

export default function Faucet() {
  const [account, setAccount] = useState(null);
  const [loadingX, setLoadingX] = useState(false);
  const [loadingY, setLoadingY] = useState(false);
  const [txHashX, setTxHashX] = useState(null);
  const [txHashY, setTxHashY] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0) setAccount(accounts[0]);
        })
        .catch((error) => console.error("Error checking accounts:", error));

      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });

      window.ethereum.on("chainChanged", () => window.location.reload());
    } else {
      setErrorMessage("🦊 You need MetaMask, fam! Install it first.");
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("🛑 Connection failed:", error);
        setErrorMessage("Failed to connect to wallet.");
      }
    } else {
      setErrorMessage("🦊 You need MetaMask, fam! Install it first.");
    }
  };

  const claim = async (tokenType) => {
    if (!account) {
      alert("Connect your wallet first, chief!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const faucetContract = new ethers.Contract(FAUCET_ADDRESS, faucetAbi, signer);

      if (tokenType === "x") {
        setLoadingX(true);
        const tx = await faucetContract.claimTokenx();
        await tx.wait();
        setTxHashX(tx.hash);
      } else {
        setLoadingY(true);
        const tx = await faucetContract.claimTokeny();
        await tx.wait();
        setTxHashY(tx.hash);
      }
    } catch (error) {
      console.error(`❌ Claim ${tokenType} failed:`, error);
      setErrorMessage(`Error: ${error?.reason || error?.message || "Something went wrong"}`);
    } finally {
      if (tokenType === "x") setLoadingX(false);
      else setLoadingY(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 w-full max-w-sm flex flex-col items-center">
        <h1 className="text-2xl font-extrabold mb-6 text-black uppercase">
          🌊 Token Faucet
        </h1>

        {errorMessage && (
          <div className="mb-4 text-red-600 font-bold text-center">{errorMessage}</div>
        )}

        {!account ? (
          <button
            onClick={connectWallet}
            className="w-full bg-[#6a4cfa] hover:bg-[#8a63f5] text-white font-bold py-3 px-6 rounded-none border-2 border-black transition"
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <div className="mb-4 text-gray-700 font-mono text-sm break-words text-center">
              Connected: {account.substring(0, 6)}...{account.slice(-4)}
            </div>

            <button
              onClick={() => claim("x")}
              disabled={loadingX}
              className={`w-full ${
                loadingX ? "bg-gray-400 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500"
              } text-black font-bold py-3 px-6 rounded-none border-2 border-black transition mb-3`}
            >
              {loadingX ? "Claiming TokenX..." : "Claim TokenX"}
            </button>

            {txHashX && (
              <div className="text-blue-700 font-mono text-xs text-center mb-2">
                <a
                  href={`https://etherscan.io/tx/${txHashX}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  View TokenX Tx
                </a>
              </div>
            )}

            <button
              onClick={() => claim("y")}
              disabled={loadingY}
              className={`w-full ${
                loadingY ? "bg-gray-400 cursor-not-allowed" : "bg-purple-400 hover:bg-purple-500"
              } text-black font-bold py-3 px-6 rounded-none border-2 border-black transition mb-3`}
            >
              {loadingY ? "Claiming TokenY..." : "Claim TokenY"}
            </button>

            {txHashY && (
              <div className="text-blue-700 font-mono text-xs text-center">
                <a
                  href={`https://etherscan.io/tx/${txHashY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  View TokenY Tx
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
