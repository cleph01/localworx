import db from "@/db/db";

type MarketplaceItemBusinessDetailsSectionProps = {
  businessId: string;
};

const MarketplaceItemBusinessDetailsSection = async ({
  businessId,
}: MarketplaceItemBusinessDetailsSectionProps) => {
  const business = await db("businesses").where("id", businessId).first();
  if (!business) {
    return <div className="text-gray-500">Business not found</div>;
  }

  return (
    <div className="w-full max-w-4xl px-4 flex flex-col justify-center gap-2 mb-4">
      {/* Business Name */}
      <p className="flex-1 text-lg font-semibold text-gray-800 ">
        {business.business_name}
      </p>
      <div className="flex flex-row items-center justify-between gap-2">
        {/* Business Category  */}
        <BusinessCategorySection categoryId={business.category_id} />

        {/* Business Rating/Reviews */}
        <BusinessReviewsSection businessId={businessId} />
      </div>

      <p className="text-gray-600 text-sm">
        <span>📍</span> {business.address} {business.city}, {business.state}
      </p>
    </div>
  );
};

export default MarketplaceItemBusinessDetailsSection;

//**/

type BusinessCategorySectionProps = {
  categoryId: string;
};

const BusinessCategorySection = async ({
  categoryId,
}: BusinessCategorySectionProps) => {
  const category = await db("business_categories")
    .where("id", categoryId)
    .first();

  if (!category) {
    return <div className="text-gray-500">Category not found</div>;
  }

  return (
    <span className="flex-shrink capitalize bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full">
      {category.name}
    </span>
  );
};

///**

type BusinessReviewsSectionProps = {
  businessId: string;
};
const BusinessReviewsSection = async ({
  businessId,
}: BusinessReviewsSectionProps) => {
  const reviews = await db("business_reviews")
    .where("business_id", businessId)
    .select("rating")
    .limit(5);

  if (reviews.length === 0) {
    return <div className="text-gray-500">No reviews yet</div>;
  }

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <span className="text-gray-600 text-sm font-semibold">
      ⭐ {averageRating}{" "}
      <span className="text-xs text-gray-400"> ({reviews.length} reviews)</span>
    </span>
  );
};
