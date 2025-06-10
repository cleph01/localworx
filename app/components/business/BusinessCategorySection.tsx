import db from "@/db/db";

type BusinessCategorySectionProps = {
  categoryId: string;
};

const BusinessCategorySection = async ({
  categoryId,
}: BusinessCategorySectionProps) => {
  // SSR: Fetch the business category from the database
  const category = await db("business_categories")
    .where("id", categoryId)
    .first();

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="flex flex-row items-center gap-2">
      <span className="flex-shrink inline-block text-center bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full capitalize">
        {category.name}
      </span>
    </div>
  );
};

export default BusinessCategorySection;
