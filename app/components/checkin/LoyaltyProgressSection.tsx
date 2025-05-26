"use client";

import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import { useEffect, useState } from "react";
import { Checkin, Reward } from "../../utilities/mockDatabase/mockDatabase";

interface LoyaltyData {
  checkins: number;
  threshold: number;
  rewardDescription: string;
}

const fetchRewards = async (businessId: string) => {
  try {
    const rewards = await mockFetch(`/api/rewards?businessId=${businessId}`);
    if (!rewards)
      throw new Error("Failed to get Rewards in Loyalty Progress Section");
    return rewards.data;
  } catch (error) {
    console.error("Error fetching check-in history:", error);
  }
};

const fetchCheckinHistory = async (businessId: string, userId: string) => {
  try {
    const checkinHistory = await mockFetch(
      `/api/checkins?businessId=${businessId}&userId=${userId}`
    );
    if (!checkinHistory)
      throw new Error("Failed to get checkin in Loyalty Progress Section");
    return checkinHistory.data;
  } catch (error) {
    console.error("Error fetching check-in history:", error);
  }
};

const LoyaltyProgressSection = ({
  businessId,
  userId,
}: {
  businessId: string;
  userId: string;
}) => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [checkinHistory, setCheckinHistory] = useState<Checkin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoyaltyData = async () => {
      try {
        const rewardsData = await fetchRewards(businessId);
        const checkinData = await fetchCheckinHistory(businessId, userId);

        setRewards(rewardsData);
        setCheckinHistory(checkinData);
      } catch (error) {
        console.error("Error fetching loyalty data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoyaltyData();
  }, []);

  if (loading) {
    return (
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-sm text-gray-500">Loading loyalty progress...</p>
      </section>
    );
  }

  if (!rewards || !checkinHistory) return null;

  // Assuming itemData is an array of rewards with a 'type' property
  const loyaltyRewardObj = rewards.find(
    (reward: any) => reward.type === "loyalty"
  );
  const loyaltyReward = loyaltyRewardObj?.title ?? "";
  const threshold = loyaltyRewardObj?.threshold ?? 0;
  //
  const IntroOfferObj = rewards.find((reward: any) => reward.type === "intro");
  const introOffer = IntroOfferObj?.title ?? "";

  // TODO: Think of a way to track redemptions vs. a running count of
  // checkins.
  //   const progress = Math.min(checkins / data.threshold, 1);
  const rewardReady = checkinHistory.length >= Number(threshold);

  return (
    <section className="min-w-85 sm:min-w-125 max-w-4xl bg-white border border-gray-400 rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-slate-700 mb-2">
        🎯 Loyalty Reward Progress
      </h3>

      <div className="text-sm text-gray-600 mb-4">
        {rewardReady ? (
          <span className="text-green-700 font-semibold">
            🎉 You've earned a reward!
          </span>
        ) : (
          <span>
            You’ve checked in <strong>{checkinHistory.length}</strong> out of{" "}
            <strong>{threshold}</strong> times needed to earn:{" "}
            <em>{loyaltyReward}</em>
          </span>
        )}
      </div>

      {/* Progress bar */}
      {/* <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-2">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${progress * 100}%` }}
        />
      </div> */}

      {/* First Time User Offer */}
      {introOffer && <IntroOfferSection introOffer={introOffer} />}
    </section>
  );
};

export default LoyaltyProgressSection;

const IntroOfferSection = ({ introOffer }: { introOffer: string }) => {
  return (
    <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-bold text-yellow-800 mb-2">
        🎉 First-Time Offer
      </h3>
      <p className="text-sm text-yellow-700">{introOffer}</p>
    </section>
  );
};
