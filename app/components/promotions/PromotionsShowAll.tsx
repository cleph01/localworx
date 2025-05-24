import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import Button from "../ui/Button";
import PromotionCard from "../promotions/PromotionCard";
import { PromotionCardProps } from "../promotions/promotionTypes";

const PromotionsShowAll = async () => {
  const promotions = await mockFetch("/api/promotions");

  if (!promotions) {
    return <div>No Promotions Found</div>;
  }

  const promotionsData = promotions.data;

  return (
    <section className="flex flex-col gap-4 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example listing item */}
        {promotionsData.map((promotion: any) => (
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
export default PromotionsShowAll;
// This component is a placeholder for the listings section of the services directory page.
