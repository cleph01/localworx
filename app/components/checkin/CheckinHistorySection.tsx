// components/checkin/CheckinHistorySection.tsx

"use client";

import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import { useEffect, useState } from "react";

interface CheckinHistory {
  id: string;
  timestamp: string;
  redeemed?: boolean;
}

interface CheckinHistorySectionProps {
  businessId: string;
}

const CheckinHistorySection = ({ businessId }: CheckinHistorySectionProps) => {
  const [history, setHistory] = useState<CheckinHistory[]>([]);
  const [loading, setLoading] = useState(true);

  // userId will come from the session object
  const userId = "3";

  useEffect(() => {
    const fetchCheckinHistory = async () => {
      try {
        const res = await mockFetch(`/api/checkins?userId=${userId}`);
        const data = await res.data;

        setHistory(data);
      } catch (error) {
        console.error("Error fetching check-in history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckinHistory();
  }, [userId]);

  if (loading) {
    return (
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-sm text-gray-500">Loading check-in history...</p>
      </section>
    );
  }

  return (
    <section className="min-w-85 sm:min-w-125 max-w-4xl bg-white border border-gray-400 rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-slate-700 mb-2">
        🧾 Your Check-In History
      </h3>

      {history.length === 0 ? (
        <p className="text-sm text-gray-500">
          You haven’t checked in here yet.
        </p>
      ) : (
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
          {history.map((entry) => (
            <li key={entry.id}>
              ✅ Checked in on{" "}
              <span className="font-medium">
                {new Date(entry.timestamp).toLocaleString()}
              </span>
              {entry.redeemed && (
                <span className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                  🎉 Reward Redeemed
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CheckinHistorySection;
