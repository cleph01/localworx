"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { getUserCoordinates } from "../../lib/checkin/getUserCoordinates";
import { haversineDistance } from "../../lib/haversine";
import { submitCheckin } from "../../lib/checkin/submitCheckin";
import { Checkin } from "../../utilities/mockDatabase/mockDatabase";

type Props = {
  businessId: string;
  businessLat: number;
  businessLon: number;
  userId: string;
};

const HandleCheckinSection = ({
  businessId,
  businessLat,
  businessLon,
  userId,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<{
    message: string;
    userCheckinCount: number;
    eligibleForReward: boolean;
  } | null>(null);

  const handleCheckin = async () => {
    setLoading(true);
    try {
      const coords = await getUserCoordinates();
      const distanceMeters = haversineDistance(coords, {
        latitude: businessLat,
        longitude: businessLon,
      });

      if (distanceMeters > 150) {
        toast.warning("📍 You're too far from the business location.");
        setLoading(false);
        return;
      }

      const checkinData: Omit<Checkin, "id"> = {
        businessId,
        userId,
        timestamp: new Date().toISOString(),
        latitude: coords.latitude,
        longitude: coords.longitude,
      };

      const result = await submitCheckin(checkinData);

      if (result?.checkin) {
        toast.success("✅ Check-in successful!");
        setSummary({
          message: result.message,
          userCheckinCount: result.userCheckinCount,
          eligibleForReward: result.eligibleForReward,
        });

        // Optional enhancement: You could trigger a global state update or event here if needed
        // e.g. context.dispatch({ type: 'CHECKIN_COMPLETED', data: result })
      } else {
        toast.error("❌ Check-in failed: Invalid response.");
      }
    } catch (error) {
      toast.error("❌ Check-in failed");
      console.error("Check-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl bg-white border border-gray-400 rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-xl font-bold mb-2">Ready to check in?</h3>

      <button
        onClick={handleCheckin}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Checking in..." : "✅ Check In Now"}
      </button>

      {/* Show a visual summary of the check-in result */}
      {summary && (
        <div className="mt-4 bg-gray-100 p-4 rounded border border-gray-200">
          <p className="text-green-700 font-semibold">{summary.message}</p>
          <p className="text-sm mt-1">
            Check-in Count:{" "}
            <span className="font-bold">{summary.userCheckinCount}</span>
          </p>
          {summary.eligibleForReward && (
            <p className="text-sm text-yellow-600 mt-1">
              🎉 You’re now eligible to redeem your reward!
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default HandleCheckinSection;
