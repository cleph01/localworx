"use client";

import useSWR from "swr";

const BusinessCategorySection = ({ categoryId }: { categoryId: string }) => {
  // Client-side fetching of category
  // Generic fetcher function
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok) throw new Error("Business Category response was not ok");
      return res.json();
    });

  const searchUrl = `/api/business/category/${categoryId}`;

  const { data: category, error, isLoading } = useSWR(searchUrl, fetcher);

  if (isLoading) {
    return <div className="text-gray-500">Loading category...</div>;
  }
  if (error) {
    console.error("Error fetching category:", error);
  }

  if (!category) {
    return <div>No category found</div>;
  }

  const { name: categoryName } = category;

  return (
    <div className="flex-1 inline-block text-center bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
      {categoryName}
    </div>
  );
};

export default BusinessCategorySection;
