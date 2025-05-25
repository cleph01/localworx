// RewardCalloutSection.tsx

import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import { PromotionRewardCalloutSectionProps } from "./promotionTypes";

const RewardCalloutSection = async ({
  data,
}: PromotionRewardCalloutSectionProps) => {
  const rewards = await mockFetch(`/api/rewards?${data.businessId}`);
  if (!rewards) {
    return <div>No rewards available</div>;
  }

  // Find Intro Reward
  const introOffer = rewards.data.find(
    (reward: any) => reward.type === "loyalty"
  );

  // Find Loyalty Reward
  const loyaltyReward = rewards.data.find(
    (reward: any) => reward.type === "loyalty"
  );

  // Render the rewards section
  return (
    <section className="bg-green-50 border border-green-200 rounded px-6 py-4 mx-4 mb-2 space-y-2">
      <h2 className="text-xl font-bold mb-2">🎉 Earn Rewards</h2>
      <p className="text-gray-700 mb-4">
        Check in with this business and start earning perks. Become a promoter
        and receive discounts, merch, or{" "}
        <span className="text-orange-500 font-semibold">₿itcoin</span>!
      </p>
      {/* Intro Offer */}
      {introOffer && (
        <div className="space-y-2 mb-4">
          <h2 className="text-xl font-bold mb-2">🎁 Introductory Offer</h2>
          <p className="text-gray-700 text-base font-semibold">
            {introOffer.title}
          </p>
          <p className="text-gray-700 text-sm">
            On your first visit when you check-in using LocalWorx.
          </p>
        </div>
      )}

      {/* Loyalty Reward Section */}
      {loyaltyReward && (
        <div className="space-y-2">
          <h2 className="text-xl font-bold mb-2">🔁 Loyalty Program</h2>
          <p className="text-gray-700 text-base font-semibold">
            {loyaltyReward.title}
          </p>
          <p className="text-gray-700 text-sm">
            Check in at this business{" "}
            <span className="font-semibold">
              {loyaltyReward.threshold}{" "}
              {Number(loyaltyReward.threshold) > 1 ? "times" : "time"}
            </span>{" "}
            🛎️ and start earning rewards which you can redeem here or re-sell
            for Bitcoin on the marketplace!
          </p>
        </div>
      )}
    </section>
  );
};
export default RewardCalloutSection;
