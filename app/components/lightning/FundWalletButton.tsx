// components/wallet/FundWalletButton.tsx
"use client";

import { useState } from "react";
import FundWalletModal from "./FundWalletModal";

interface FundWalletButtonProps {
  walletId: string;
}

const FundWalletButton = ({ walletId }: FundWalletButtonProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm font-semibold"
      >
        ➕ Fund Wallet
      </button>

      {showModal && (
        <FundWalletModal
          walletId={walletId}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default FundWalletButton;
