import React, { useState } from 'react';
import { BrowserProvider, Contract, parseUnits } from 'ethers';

const RemoveLiquidity = () => {
  const [lpAmount, setLpAmount] = useState('');
  const [status, setStatus] = useState('');

  const poolAddress = "0x38cD6e08dA3dCAAF4E77900fdFCB77F568A4fC41";
  const lpTokenAddress = "0xf66593Bc2e5d3D476feB0Bf804B03A5675920696";

  const lpTokenABI = [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function balanceOf(address account) external view returns (uint256)"
  ];

  const poolABI = [
    "function removeLiquidity(uint256 lpAmount) external"
  ];

  const handleRemoveLiquidity = async () => {
    try {
      if (!window.ethereum) throw new Error("🦊 MetaMask not found");

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const poolContract = new Contract(poolAddress, poolABI, signer);
      const lpTokenContract = new Contract(lpTokenAddress, lpTokenABI, signer);

      const parsedAmount = parseUnits(lpAmount, 18);

      const allowance = await lpTokenContract.allowance(userAddress, poolAddress);
      if (allowance < parsedAmount) {
        const approveTx = await lpTokenContract.approve(poolAddress, parsedAmount);
        await approveTx.wait();
      }

      const tx = await poolContract.removeLiquidity(parsedAmount);
      await tx.wait();

      setStatus("✅ Liquidity removed successfully");
    } catch (err) {
      console.error(err);
      setStatus(`❌ ${err.message}`);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#f4f4f4]">
      <div className="w-full max-w-md border-4 border-black bg-white p-8 space-y-6">
        <h2 className="text-2xl font-extrabold text-center text-black uppercase tracking-wider">
          Remove Liquidity
        </h2>
        <input
          type="number"
          placeholder="LP Token Amount"
          value={lpAmount}
          onChange={(e) => setLpAmount(e.target.value)}
          className="w-full p-3 border-4 border-black bg-[#fafafa] text-black font-mono focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleRemoveLiquidity}
          className="w-full bg-[#9966ff] text-black border-4 border-black py-3 font-bold uppercase hover:bg-black hover:text-[#9966ff] transition-all duration-150"
        >
          Remove Liquidity
        </button>
        {status && (
          <p className="text-sm font-mono text-center text-black bg-yellow-200 border-2 border-black p-2">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default RemoveLiquidity;