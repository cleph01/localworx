import { FaBitcoin, FaBtc } from "react-icons/fa";
import Button from "../ui/Button";
import PromotionListingCard from "../promotions/PromotionCard";
import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import { PromotionCardProps } from "../promotions/promotionTypes";
import PromotionCard from "../promotions/PromotionCard";

const BusinessPromotionsSection = async () => {
  const promotions = await mockFetch("/api/promotions");

  if (!promotions) {
    return <div>No Promotions Found</div>;
  }

  const promotionsData = promotions.data;

  return (
    <section className="w-full max-w-4xl flex flex-col gap-4 pb-8 py-6 px-4">
      <h2 className="text-2xl font-bold mb-2">📢 Current Promotions</h2>
      <p className="text-gray-600 mb-2">
        Promoters get paid{" "}
        <span className="text-orange-500 font-bold text-lg">
          {/* <FaBtc /> */}₿
        </span>{" "}
        for referring customers!
      </p>

      <p className="text-gray-600 mb-4">
        {" "}
        Here are some Promoters like you currently earning Zaps!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example listing item */}
        {promotionsData.map(({ promotion }: PromotionCardProps) => (
          <PromotionCard key={promotion.id} promotion={promotion} />
        ))}
      </div>

      {/* Load More Results Button */}
      <Button
        details={{
          text: "Load more results",
          css: "w-full my-6 py-4 bg-navy-blue-background text-white text-base font-bold",
        }}
      />
    </section>
  );
};
export default BusinessPromotionsSection;
// This component is a placeholder for the listings section of the services directory page.
