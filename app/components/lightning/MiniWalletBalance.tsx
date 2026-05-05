"use client";

import useSWR from "swr";

interface WalletBalanceProps {
  businessId: number;
}

const MiniWalletBalance = ({ businessId }: WalletBalanceProps) => {
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId }),
    });
    if (!res.ok) throw new Error("Failed to fetch wallet balance");
    return res.json();
  };

  const { data, error, isLoading } = useSWR(
    `/api/lightning/check-balance?businessId=${businessId}`,
    fetcher
  );

  if (isLoading) {
    return <div className="h-8 w-32 bg-white/10 rounded animate-pulse" />;
  }
  if (error) {
    return <p className="text-red-400 text-xs">Failed to load balance</p>;
  }

  const sats = data?.balance ?? 0;

  return (
    <div>
      <p className="text-2xl font-bold text-white tracking-tight">
        {sats.toLocaleString()}
        <span className="text-sm font-normal text-white/50 ml-1">sats</span>
      </p>
    </div>
  );
};

export default MiniWalletBalance;
