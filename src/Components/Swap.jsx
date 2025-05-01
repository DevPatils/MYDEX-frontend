// Swap.jsx
import React, { useState } from 'react';
import { BrowserProvider, Contract, parseUnits } from 'ethers';

const Swap = () => {
  const [amount, setAmount] = useState('');
  const [tokenDirection, setTokenDirection] = useState('XtoY');
  const [status, setStatus] = useState('');

  const poolAddress = "0x38cD6e08dA3dCAAF4E77900fdFCB77F568A4fC41";
  const tokenXAddress = "0x30B57FfDEfa6Faa933E9c36008BBa0CB3d474596";
  const tokenYAddress = "0xd3b36fa7059B1ab7B5D76A11b871A9d25e3ef5Ca";

  const poolABI = [
    "function swapXForY(uint amountX) external",
    "function swapYForX(uint amountY) external"
  ];

  const erc20ABI = [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function balanceOf(address account) external view returns (uint256)"
  ];

  const handleSwap = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not found");

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const poolContract = new Contract(poolAddress, poolABI, signer);
      const tokenAddress = tokenDirection === 'XtoY' ? tokenXAddress : tokenYAddress;
      const tokenContract = new Contract(tokenAddress, erc20ABI, signer);
      const parsedAmount = parseUnits(amount, 18);

      const allowance = await tokenContract.allowance(userAddress, poolAddress);
      if (allowance < parsedAmount) {
        const tx = await tokenContract.approve(poolAddress, parsedAmount);
        await tx.wait();
      }

      const swapTx = tokenDirection === 'XtoY'
        ? await poolContract.swapXForY(parsedAmount)
        : await poolContract.swapYForX(parsedAmount);

      await swapTx.wait();
      setStatus('✅ Swap successful');
    } catch (err) {
      console.error(err);
      setStatus(`❌ ${err.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f9f9f9]">
      <div className="bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] p-6 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Swap Tokens</h2>
        <select
          value={tokenDirection}
          onChange={(e) => setTokenDirection(e.target.value)}
          className="w-full p-2 border-2 border-black rounded bg-yellow-200 font-semibold"
        >
          <option value="XtoY">Swap Token X → Token Y</option>
          <option value="YtoX">Swap Token Y → Token X</option>
        </select>
        <input
          type="number"
          placeholder="Amount to swap"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border-2 border-black rounded bg-pink-100 font-mono"
        />
        <button
          onClick={handleSwap}
          className="w-full bg-black text-white py-2 rounded shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform duration-150"
        >
          Swap
        </button>
        {status && <p className="text-center font-semibold">{status}</p>}
      </div>
    </div>
  );
};

export default Swap;