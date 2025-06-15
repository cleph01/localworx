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

  const { data, error, isLoading } = useSWR(searchUrl, fetcher);

  if (isLoading) {
    return <div className="text-gray-500">Loading category...</div>;
  }
  if (error) {
    console.error("Error fetching category:", error);
  }

  if (!data) {
    return <div>No category found</div>;
  }

  console.log("Fetched category:", data);

  return (
    <div className="flex-1 inline-block text-center bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
      {data.name}
    </div>
  );
};

export default BusinessCategorySection;
