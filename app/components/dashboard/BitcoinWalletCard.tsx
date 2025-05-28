"use client";

import FundWalletButton from "../lightning/FundWalletButton";
import MiniWalletBalance from "../lightning/MiniWalletBalance";

const BitcoinWalletCard = ({ walletId }: { walletId: string }) => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <h3 className="font-bold text-lg mb-2">⚡ Bitcoin Wallet</h3>
      <p className="text-gray-600 text-sm break-all mb-3">{walletId}</p>

      <MiniWalletBalance walletId={walletId} />

      <div className="mt-4">
        <FundWalletButton walletId={walletId} />
      </div>
    </div>
  );
};

export default BitcoinWalletCard;
