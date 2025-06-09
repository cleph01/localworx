import db from "@/db/db";
import BusinessCategorySection from "../BusinessCategorySection/BusinessCategorySection";

type BusinessDetailsSectionProps = {
  businessId: number | string;
  categoryId: number | string;
};

const BusinessDetailsSection = async ({
  businessId,
  categoryId,
}: BusinessDetailsSectionProps) => {
  const business = await db("businesses").where("id", businessId).first();

  if (!business) {
    return <div className="text-gray-500">Business not found</div>;
  }
  const { name: businessName, category, address, city, state } = business;

  return (
    <div className="flex flex-col justify-center gap-2 mt-2">
      {/* Business Name */}
      <p className="flex-1 text-lg font-semibold text-gray-800 ">
        {businessName}
      </p>
      {/* Business Category  */}
      <BusinessCategorySection categoryId={categoryId} />

      <p className="">
        <span>📍</span> {address} {city}, {state}
      </p>
    </div>
  );
};

export default BusinessDetailsSection;
