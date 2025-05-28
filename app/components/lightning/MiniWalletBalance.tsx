"use client";

import { useEffect, useState } from "react";

interface WalletBalanceProps {
  walletId: string;
}

const MiniWalletBalance = ({ walletId }: WalletBalanceProps) => {
  const [sats, setSats] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/lightning/wallet/${walletId}/balance`);
        const data = await res.json();
        if (res.ok && data.balance) {
          setSats(Math.floor(data.balance / 1000)); // Convert msats → sats
        }
      } catch (err) {
        console.error("Wallet balance fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [walletId]);

  if (loading) return null;

  return sats !== null ? (
    <p className="text-sm text-green-700 font-medium mt-2">
      💰 Wallet Balance: {sats.toLocaleString()} sats
    </p>
  ) : (
    <p className="text-sm text-red-600">Wallet not found</p>
  );
};

export default MiniWalletBalance;

/**
 * 
 * Integration Plan
Pass walletId directly to the <WalletBalance /> component

import WalletBalance from "@/components/wallet/WalletBalance";

<WalletBalance walletId={business.subwalletId} />

If you're rendering a business profile or dashboard, just make sure the walletId is loaded alongside the rest of the data.
 */
