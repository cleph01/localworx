import { useFetchBusinessCategory } from "@/app/hooks/dashboard/MyBusinessesSection/useFetchCategoryByBusinessId";

type BusinessCategorySectionProps = { categoryId: number | string };

const BusinessCategorySection = ({
  categoryId,
}: BusinessCategorySectionProps) => {
  const { category, loading, error } = useFetchBusinessCategory(
    Number(categoryId)
  );

  if (loading) {
    return <p className="text-gray-500">Loading category...</p>;
  }
  if (error) {
    return (
      <p className="text-red-500">Error loading category: {error.message}</p>
    );
  }

  if (!category) {
    return <p className="text-gray-500">Category not found</p>;
  }

  const { name: categoryName } = category;
  return (
    <div className="flex items-center">
      <p className="flex-shrink capitalize bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full">
        {categoryName}
      </p>
    </div>
  );
};

export default BusinessCategorySection;
