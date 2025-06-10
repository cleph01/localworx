// Server Component to show all promotions
import Button from "../ui/Button";
import PromotionCard from "./PromotionCard/PromotionCard";
import { PromotionCardProps } from "../promotions/promotionTypes";
import db from "@/db/db";

const PromotionsShowAll = async () => {
  const promotions = await db("promotions").select("*");

  if (!promotions) {
    return <div>No promotions found</div>;
  }

  console.log("Promotions data:", promotions);
  return (
    <section className="flex flex-col items-center gap-4 pb-8 px-4">
      <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {/* Example listing item */}
        {promotions.map((promotion: any) => (
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
