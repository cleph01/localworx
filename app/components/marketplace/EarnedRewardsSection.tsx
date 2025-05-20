// EarnedRewardsSection.tsx
import { FaGift } from "react-icons/fa";

const EarnedRewardsSection = () => {
  return (
    <section className="px-4 mt-12 flex flex-col items-center">
      <FaGift className="w-10 h-10 text-blue-500 mb-4" />
      <h2 className="text-4xl font-bold mb-4">
        Turn Check-Ins Into Opportunity
      </h2>
      <p className="text-gray-600 font-semibold text-lg max-w-2xl">
        Every Check-In you make can earn you rewards from the businesses you
        support.
      </p>
      <p className="text-gray-600 text-lg max-w-2xl mt-4">
        Don’t need that free haircut or discounted meal?
      </p>
      <p className="text-gray-600 text-lg max-w-2xl mt-4">
        Post it on the Marketplace and sell it to someone who does - and collect
        the Bitcoin.
      </p>
    </section>
  );
};

export default EarnedRewardsSection;
