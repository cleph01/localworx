// // components/checkin/LocationCheckinSection.tsx
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";

interface LocationCheckinSectionProps {
  businessId: string;
}

const LocationCheckinSection = ({
  businessId,
}: LocationCheckinSectionProps) => {
  const [checkingIn, setCheckingIn] = useState(false);
  // store result of checkin to be displayed below
  const [checkinResult, setCheckinResult] = useState<{
    userCheckinCount: number;
    eligibleForReward: boolean;
  } | null>(null);

  const handleCheckIn = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    setCheckingIn(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch("/api/checkin/validate-location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              businessId,
              userLocation: { latitude, longitude },
            }),
          });

          const result = await res.json();

          if (res.ok) {
            toast.success("🎉 Check-in successful!");

            // Save the result of a successful check in
            setCheckinResult({
              userCheckinCount: result.data.userCheckinCount,
              eligibleForReward: result.data.eligibleForReward,
            });

            // 🎊 Trigger confetti!
            confetti({
              particleCount: 120,
              spread: 70,
              origin: { y: 0.6 },
            });
          } else {
            toast.error(result.message || "Check-in failed.");
          }
        } catch (error) {
          toast.error("Something went wrong. Please try again.");
        } finally {
          setCheckingIn(false);
        }
      },
      () => {
        toast.error("Unable to retrieve your location.");
        setCheckingIn(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <section className="max-w-4xl bg-white border border-gray-400 rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-slate-700 mb-2">📍 Check-In</h3>
      <p className="text-sm text-gray-600 mb-4">
        Tap the button below to verify your location and check in to this
        business.
      </p>
      <button
        onClick={handleCheckIn}
        disabled={checkingIn}
        className={`w-full py-3 rounded-md font-bold text-white text-base transition-colors ${
          checkingIn
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {checkingIn ? "Verifying..." : "✅ Verify My Location & Check In"}
        {/* Display Checkin result */}
        {checkinResult && (
          <div className="mt-4 p-4 rounded-md border bg-green-50 border-green-300 text-green-800 shadow-sm">
            <p>
              ✅ You’ve checked in {checkinResult.userCheckinCount}{" "}
              {checkinResult.userCheckinCount === 1 ? "time" : "times"} at this
              location.
            </p>
            {checkinResult.eligibleForReward ? (
              <p className="mt-1 font-semibold">
                🎁 You’re eligible for a loyalty reward!
              </p>
            ) : (
              <p className="mt-1">Keep going — your reward is coming soon!</p>
            )}
          </div>
        )}
      </button>
    </section>
  );
};

export default LocationCheckinSection;
