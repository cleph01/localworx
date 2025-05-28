"use client";

import { useEffect, useState } from "react";

interface ZapTotalsTrackerProps {
  targetPubkey: string;
  eventId: string;
}

interface ZapperProfile {
  pubkey: string;
  name?: string;
  picture?: string;
}

const ZapTotalsTracker = ({ targetPubkey, eventId }: ZapTotalsTrackerProps) => {
  const [totalSats, setTotalSats] = useState<number | null>(null);
  const [zapCount, setZapCount] = useState<number | null>(null);
  const [zappers, setZappers] = useState<ZapperProfile[]>([]);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeAgo, setTimeAgo] = useState<string>("");

  const fetchTotals = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/nostr/zap/totals?targetPubkey=${targetPubkey}&eventId=${eventId}`
      );
      const data = await res.json();

      if (res.ok) {
        setTotalSats(data.totalSats);
        setZapCount(data.zapCount);
        setLastUpdated(Date.now());

        // Fetch up to 5 zappers’ profiles
        const profiles = await Promise.all(
          data.zappers.slice(0, 5).map(async (pubkey: string) => {
            try {
              const res = await fetch(`/api/nostr/profile/${pubkey}`);
              const profile = await res.json();
              return { pubkey, ...profile };
            } catch {
              return { pubkey };
            }
          })
        );
        setZappers(profiles);
      } else {
        console.warn("Error fetching zap totals:", data.error);
      }
    } catch (err) {
      console.error("Zap totals fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotals();
  }, [targetPubkey, eventId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!lastUpdated) return;
      const seconds = Math.floor((Date.now() - lastUpdated) / 1000);
      setTimeAgo(`${seconds} second${seconds !== 1 ? "s" : ""} ago`);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdated]);

  if (loading || zapCount === null || zapCount === 0) return null;

  return (
    <div className="flex flex-col items-start text-sm text-yellow-600 font-semibold mt-2">
      <p>
        ⚡ {totalSats?.toLocaleString()} sats received from {zapCount} zap
        {zapCount > 1 ? "s" : ""}
      </p>

      {lastUpdated && (
        <span className="text-xs text-gray-500">Last updated: {timeAgo}</span>
      )}

      <ZapperAvatarList zappers={zappers} />

      <button
        onClick={fetchTotals}
        className="text-xs mt-1 px-2 py-1 bg-yellow-100 border border-yellow-400 rounded hover:bg-yellow-200 transition"
      >
        🔄 Refresh
      </button>
    </div>
  );
};

export default ZapTotalsTracker;

// Subcomponent Avatar List container
const ZapperAvatarList = ({ zappers }: { zappers: ZapperProfile[] }) => {
  return (
    <div className="flex space-x-2 mt-2">
      {zappers.map((z) => (
        <div
          key={z.pubkey}
          className="w-8 h-8 rounded-full border border-yellow-500 overflow-hidden bg-yellow-50 flex items-center justify-center text-xs font-bold text-yellow-800"
          title={z.name || z.pubkey}
        >
          {z.picture ? (
            <img
              src={z.picture}
              alt={z.name || z.pubkey}
              className="object-cover w-full h-full"
            />
          ) : (
            z.name?.charAt(0).toUpperCase() || "⚡"
          )}
        </div>
      ))}
    </div>
  );
};
