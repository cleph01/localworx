"use client";

import { FaBolt } from "react-icons/fa";
import FundWalletButton from "../../lightning/FundWalletButton";
import MiniWalletBalance from "../../lightning/MiniWalletBalance";

type BitcoinWalletCardProps = {
  businessId: number;
  walletName: string;
};

const BitcoinWalletCard = ({ businessId, walletName }: BitcoinWalletCardProps) => {
  return (
    <div
      className="rounded-2xl p-5 text-white shadow-lg relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #091f36 0%, #0d2d50 60%, #0f3660 100%)" }}
    >
      {/* Subtle decorative circle */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
      <div className="absolute -bottom-6 -right-4 w-20 h-20 rounded-full bg-white/5" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <FaBolt className="text-brand-orange text-sm" />
          <span className="text-xs font-semibold text-white/60 uppercase tracking-wide">
            Lightning Wallet
          </span>
        </div>

        <MiniWalletBalance businessId={businessId} />

        <p className="text-xs text-white/40 mt-1 truncate">{walletName}</p>

        <div className="mt-5">
          <FundWalletButton businessId={businessId} />
        </div>
      </div>
    </div>
  );
};

export default BitcoinWalletCard;
