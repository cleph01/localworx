import useSWR from "swr";

type BusinessCategorySectionProps = { categoryId: number | string };

const BusinessCategorySection = ({
  categoryId,
}: BusinessCategorySectionProps) => {
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
