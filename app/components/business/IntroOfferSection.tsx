import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";

// IntroOfferSection.tsx
const IntroOfferSection = async ({ businessId }: { businessId: string }) => {
  // Simulate fetching from a mock database
  const item = await mockFetch(`/api/rewards?${businessId}`);

  // Check if the item exists
  if (!item) {
    return <div>Item not found</div>;
  }
  // Extract the item data
  const itemData = item.data;

  // Assuming itemData is an array of rewards with a 'type' property
  const { title: introOffer } = itemData.find(
    (reward: any) => reward.type === "intro"
  );
  const { title: loyaltyReward, threshold } = itemData.find(
    (reward: any) => reward.type === "loyalty"
  );

  return (
    <section className="bg-yellow-50 py-6 px-6 border border-yellow-300 rounded my-6 mx-6 space-y-2">
      {introOffer && (
        <div className="space-y-2">
          <h2 className="text-xl font-bold mb-2">🎁 Introductory Offer</h2>
          <p className="text-gray-700 text-base">{introOffer}</p>
          <p className="text-gray-700 text-sm">
            On your first visit when you check-in using LocalWorx.
          </p>
        </div>
      )}
      {loyaltyReward && (
        <div className="mt-6 space-y-2">
          <h2 className="text-xl font-bold mb-2">🛎️ Loyalty Reward</h2>
          <p className="text-gray-700 text-base">{loyaltyReward}</p>
          <p className="text-gray-700 text-sm">
            Check in at this business{" "}
            <span className="font-semibold">
              {threshold} {Number(threshold) > 1 ? "times" : "time"}
            </span>{" "}
            and start earning rewards which you can redeem here or re-sell for
            Bitcoin on the marketplace.
          </p>
        </div>
      )}
      {/* {introOffer && (
        <div className="mt-3 text-sm bg-yellow-100 text-yellow-800 px-3 py-2 rounded inline-block font-semibold">
          <p>🎁 Intro Offer: {introOffer}</p>
          <p>On your first visit when you check-in using LocalWorx.</p>
        </div>
      )} */}
    </section>
  );
};
export default IntroOfferSection;
