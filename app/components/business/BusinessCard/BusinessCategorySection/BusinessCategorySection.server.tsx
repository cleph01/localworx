import db from "@/db/db";

const BusinessCategorySection = async ({
  categoryId,
}: {
  categoryId: string;
}) => {
  // SSR: Fetch the business category from the database
  const category = await db("business_categories")
    .where("id", categoryId)
    .first();

  // If clientSideFetch is true, we can use a different fetching strategy

  if (!category) {
    return <div>No category found</div>;
  }

  return (
    <div className="flex-1 inline-block text-center bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
      {category.name}
    </div>
  );
};

export default BusinessCategorySection;
