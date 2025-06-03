import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import LoyaltyProgramSection from "./LoyaltyProgramSection";

// IntroOfferSection.tsx
const IntroOfferSection = async ({ businessId }: { businessId: string }) => {
  // Simulate fetching from a mock database
  // const item = await mockFetch(`/api/rewards?businessId=${businessId}`);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const response = await fetch(
    `${baseUrl}/api/business/rewards/${businessId}`,
    {
      cache: "no-store", // optional: ensure fresh data in Server Components
    }
  );

  const rewards = await response.json();

  if (!rewards) {
    return <div>No reviews found</div>;
  }

  // Assuming itemData is an array of rewards with a 'type' property
  const { name: introOffer } = rewards.find(
    (reward: any) => reward.reward_type === "intro-offer"
  );
  const { name: loyaltyReward, threshold } = rewards.find(
    (reward: any) => reward.reward_type === "loyalty"
  );

  return (
    <section className="bg-yellow-50 py-6 px-4 border border-yellow-300 rounded my-6 mx-4 space-y-2">
      {/* Intro Offer */}
      {introOffer ? (
        <div className="space-y-2">
          <h2 className="text-xl font-bold mb-2">🎁 Introductory Offer</h2>
          <p className="text-gray-700 text-base font-semibold">{introOffer}</p>
          <p className="text-gray-700 text-sm">
            On your first visit when you check-in using LocalWorx.
          </p>
        </div>
      ) : (
        <p className="text-gray-700 text-sm">Currently no Introductory Offer</p>
      )}

      {/* Loyalty Reward Section */}
      {loyaltyReward ? (
        <LoyaltyProgramSection
          loyaltyReward={loyaltyReward}
          threshold={threshold}
        />
      ) : (
        <p className="text-gray-700 text-sm">
          Currently no Rewards program available
        </p>
      )}
    </section>
  );
};
export default IntroOfferSection;
