"use client";

import { useFetchBusinessCategory } from "@/app/hooks/dashboard/MyBusinessesSection/useFetchCategoryByBusinessId";

const BusinessCategorySection = ({ categoryId }: { categoryId: string }) => {
  // Client-side fetching of category
  const { category, loading, error } = useFetchBusinessCategory(categoryId);

  if (loading) {
    return <div className="text-gray-500">Loading category...</div>;
  }
  if (error) {
    console.error("Error fetching category:", error);
  }

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
