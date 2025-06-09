import db from "@/db/db";

type BusinessCategorySectionProps = { categoryId: number | string };

const BusinessCategorySection = async ({
  categoryId,
}: BusinessCategorySectionProps) => {
  const category = await db("business_categories")
    .where("id", categoryId)
    .first();

  if (!category) {
    return <p className="text-gray-500">Category not found</p>;
  }
  const { name: categoryName } = category;
  return (
    <p className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full">
      {categoryName}
    </p>
  );
};

export default BusinessCategorySection;
