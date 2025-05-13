"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CheckInPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "locating" | "checking_in" | "success" | "error"
  >("idle");
  const [modalOpen, setModalOpen] = useState(false);
  const [checkinSummary, setCheckinSummary] = useState<null | {
    totalCheckins: number;
    visitsLeft: number;
    reward: string;
  }>(null);

  const handleCheckIn = async () => {
    setStatus("locating");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setStatus("checking_in");
        try {
          // Extract the id from the context
          const { id } = await params;
          // Make the API call to check in
          const res = await fetch(`/api/business/${id}/checkin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              businessId: id,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            setCheckinSummary({
              totalCheckins: data.totalCheckins,
              visitsLeft: data.visitsLeft,
              reward: data.reward,
            });
            setStatus("success");
            setModalOpen(true);
            toast.success("Check-in successful!");
          } else {
            throw new Error("Check-in failed");
          }
        } catch (err) {
          console.error(err);
          toast.error("Check-in failed. Please try again.");
          setStatus("error");
        }
      },
      (err) => {
        toast.error("Location access denied or unavailable.");
        setStatus("error");
      }
    );
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Check In</h1>

      {status === "idle" && (
        <button
          onClick={handleCheckIn}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Begin Check-In
        </button>
      )}

      {status === "locating" && <p>Locating you...</p>}
      {status === "checking_in" && <p>Processing your check-in...</p>}

      {modalOpen && checkinSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-bold mb-2">🎉 You're Checked In!</h2>
            <p className="mb-2">
              Total Visits: <strong>{checkinSummary.totalCheckins}</strong>
            </p>
            <p className="mb-2">
              Visits Left to Reward:{" "}
              <strong>{checkinSummary.visitsLeft}</strong>
            </p>
            <p className="mb-4">
              Reward: <strong>{checkinSummary.reward}</strong>
            </p>
            <button
              onClick={() => {
                setModalOpen(false);
                router.push("/dashboard");
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
