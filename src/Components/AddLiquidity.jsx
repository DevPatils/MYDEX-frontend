import { useEffect, useState } from "react";
import { ethers } from "ethers";

const POOL_ADDRESS = "0x38cD6e08dA3dCAAF4E77900fdFCB77F568A4fC41";
const TOKENX_ADDRESS = "0x30B57FfDEfa6Faa933E9c36008BBa0CB3d474596"; // drop your actual tokenX address
const TOKENY_ADDRESS = "0xd3b36fa7059B1ab7B5D76A11b871A9d25e3ef5Ca";// drop your actual tokenY address

const erc20Abi = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() view returns (uint8)"
];

const poolAbi = [
  "function addLiquidity(uint256 amountX, uint256 amountY) external"
];

export default function AddLiquidity() {
  const [account, setAccount] = useState(null);
  const [amountX, setAmountX] = useState("");
  const [amountY, setAmountY] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) setAccount(accounts[0]);
      });
      window.ethereum.on("accountsChanged", (acc) => setAccount(acc[0]));
    } else {
      setError("🦊 MetaMask is required to use this feature.");
    }
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (err) {
      console.error("🛑 Connection failed:", err);
      setError("Wallet connection failed.");
    }
  };

  const handleLiquidity = async () => {
    if (!account || !amountX || !amountY) return alert("Fill all fields and connect wallet.");

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tokenX = new ethers.Contract(TOKENX_ADDRESS, erc20Abi, signer);
      const tokenY = new ethers.Contract(TOKENY_ADDRESS, erc20Abi, signer);
      const pool = new ethers.Contract(POOL_ADDRESS, poolAbi, signer);

      const decimalsX = await tokenX.decimals();
      const decimalsY = await tokenY.decimals();

      const parsedX = ethers.parseUnits(amountX, decimalsX);
      const parsedY = ethers.parseUnits(amountY, decimalsY);

      const allowanceX = await tokenX.allowance(account, POOL_ADDRESS);
      const allowanceY = await tokenY.allowance(account, POOL_ADDRESS);

      if (allowanceX < parsedX) {
        const approveTx = await tokenX.approve(POOL_ADDRESS, parsedX);
        await approveTx.wait();
      }

      if (allowanceY < parsedY) {
        const approveTx = await tokenY.approve(POOL_ADDRESS, parsedY);
        await approveTx.wait();
      }

      const tx = await pool.addLiquidity(parsedX, parsedY);
      await tx.wait();
      setTxHash(tx.hash);
    } catch (err) {
      console.error(err);
      setError(err?.reason || err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };


  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 w-full max-w-sm flex flex-col items-center">
        <h1 className="text-2xl font-extrabold mb-6 text-black uppercase">🧪 Add Liquidity</h1>

        {error && <div className="mb-4 text-red-600 font-bold text-center">{error}</div>}

        {!account ? (
          <button
            onClick={connectWallet}
            className="w-full bg-[#9966ff] hover:bg-[#7e4dff] text-white font-bold py-3 px-6 rounded-none border-2 border-black transition"
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <div className="mb-4 text-gray-700 font-mono text-sm break-words text-center">
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </div>

            <input
              placeholder="Amount TokenX"
              value={amountX}
              onChange={(e) => setAmountX(e.target.value)}
              className="w-full mb-3 px-4 py-2 border-2 border-black rounded-none"
            />

            <input
              placeholder="Amount TokenY"
              value={amountY}
              onChange={(e) => setAmountY(e.target.value)}
              className="w-full mb-3 px-4 py-2 border-2 border-black rounded-none"
            />

            <button
              onClick={handleLiquidity}
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#6a4cfa] hover:bg-[#8a63f5]"
              } text-white font-bold py-3 px-6 rounded-none border-2 border-black transition`}
            >
              {loading ? "Adding Liquidity..." : "Add Liquidity"}
            </button>

            {txHash && (
              <div className="text-blue-700 font-mono text-xs text-center mt-3">
                <a
                  href={`https://etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  View Transaction
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}