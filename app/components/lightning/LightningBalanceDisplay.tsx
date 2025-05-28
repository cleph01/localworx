"use client";

import { useEffect, useState } from "react";

interface LightningBalanceDisplayProps {
  walletId: string;
  autoRefreshInterval?: number; // optional, in ms
}

const LightningBalanceDisplay = ({
  walletId,
  autoRefreshInterval = 0,
}: LightningBalanceDisplayProps) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchBalance = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/wallet/${walletId}/balance`);
      const data = await res.json();

      if (res.ok && data?.balance != null) {
        setBalance(data.balance);
        setLastUpdated(new Date());
      } else {
        throw new Error(data?.error || "Unknown error");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();

    if (autoRefreshInterval > 0) {
      const intervalId = setInterval(fetchBalance, autoRefreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [walletId, autoRefreshInterval]);

  const formatSats = (millisats: number) =>
    (millisats / 1000).toLocaleString("en-US");

  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-2">⚡ Wallet Balance</h3>

      {loading ? (
        <p className="text-sm text-gray-500">Fetching balance...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <>
          <p className="text-xl font-bold text-green-700">
            {formatSats(balance ?? 0)} sats
          </p>
          {lastUpdated && (
            <p className="text-xs text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </>
      )}

      <button
        onClick={fetchBalance}
        className="mt-3 px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
        disabled={loading}
      >
        Refresh
      </button>
    </div>
  );
};

export default LightningBalanceDisplay;

/**
 * Usage Example
In any authenticated dashboard, wallet, or profile page:
 * 
 * import LightningBalanceDisplay from "@/components/wallet/LightningBalanceDisplay";

<LightningBalanceDisplay walletId="abc123" autoRefreshInterval={15000} />

 */
