"use client";

import { useState } from "react";
import FundWalletModal from "./FundWalletModal";

interface FundWalletButtonProps {
  businessId: number;
}

const FundWalletButton = ({ businessId }: FundWalletButtonProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-brand-orange hover:bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5"
      >
        ➕ Fund Wallet
      </button>

      {showModal && (
        <FundWalletModal
          businessId={businessId}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default FundWalletButton;
