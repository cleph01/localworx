// RewardCalloutSection.tsx

import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";

const RewardCalloutSection = async ({ promotion }: { promotion: any }) => {
  const rewards = await mockFetch(`/api/rewards?${promotion.businessId}`);
  if (!rewards) {
    return <div>No rewards available</div>;
  }
  console.log(
    "promotion: ",
    promotion,
    "rewardId: ",
    promotion.rewardId,
    "Rewards data:",
    rewards
  );

  // Find Intro Reward
  const introOffer = rewards.data.find(
    (reward: any) => reward.type === "loyalty"
  );

  // Find Loyalty Reward
  const loyaltyReward = rewards.data.find(
    (reward: any) => reward.type === "loyalty"
  );

  console.log("Loyalty Reward: ", loyaltyReward);
  // Render the rewards section
  return (
    <section className="bg-green-50 border border-green-200 rounded px-6 py-4 my-6 mx-6">
      <h2 className="text-xl font-bold mb-2">🎉 Earn Rewards</h2>
      <p className="text-gray-700">
        Check in with this business and start earning Zaps. Eligible promoters
        may also receive discounts, merch, or services!
      </p>
      {promotion.introOffer && (
        <div className="mt-3 text-sm bg-yellow-100 text-yellow-800 px-3 py-2 rounded inline-block font-semibold">
          🎁 Intro Offer: {introOffer}
        </div>
      )}
      {promotion.loyaltyReward && (
        <div className="mt-3 text-sm bg-yellow-100 text-yellow-800 px-3 py-2 rounded inline-block font-semibold">
          🛎️ Loyalty Reward: {loyaltyReward}
        </div>
      )}
    </section>
  );
};
export default RewardCalloutSection;
