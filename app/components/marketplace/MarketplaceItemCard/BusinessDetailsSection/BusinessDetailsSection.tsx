import db from "@/db/db";
import BusinessCategorySection from "../BusinessCategorySection/BusinessCategorySection";
import BusinessReviewsSection from "../BusinessReviewsSection/BusinsessReviewsSection";

type BusinessDetailsSectionProps = {
  businessId: number | string;
};

const BusinessDetailsSection = async ({
  businessId,
}: BusinessDetailsSectionProps) => {
  const business = await db("businesses").where("id", businessId).first();

  if (!business) {
    return <div className="text-gray-500">Business not found</div>;
  }
  const { business_name, category_id, address, city, state } = business;

  return (
    <div className="flex flex-col justify-center gap-2 mt-2">
      {/* Business Name */}
      <p className="flex-1 text-lg font-semibold text-gray-800 ">
        {business_name}
      </p>
      <div className="flex flex-row items-center justify-between gap-2">
        {/* Business Category  */}
        <BusinessCategorySection categoryId={category_id} />

        {/* Business Rating/Reviews */}
        <BusinessReviewsSection businessId={businessId} />
      </div>

      <p className="text-gray-600 text-sm">
        <span>📍</span> {address} {city}, {state}
      </p>
    </div>
  );
};

export default BusinessDetailsSection;
