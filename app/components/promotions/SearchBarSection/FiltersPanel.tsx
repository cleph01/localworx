"use client";

import { useFetchAllBusinessCategories } from "@/app/hooks/business-categories/useFetchAllBusinessCategories";
import { FiFilter, FiArrowDownCircle } from "react-icons/fi";

type FiltersPanelProps = {
  category: string;
  onCategoryChange: (cat: string) => void;

  sortBy: string;
  onSortByChange: (value: string) => void;
};

const sortOptions = [
  "Relevance",
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
];

const FiltersPanel = ({
  category,
  onCategoryChange,

  sortBy,
  onSortByChange,
}: FiltersPanelProps) => {
  const { businessCategories, loading, error } =
    useFetchAllBusinessCategories();

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories: {error.message}</div>;

  const categoryOptions = [
    ...businessCategories.map((cat) => cat.name),
    "All",
  ].sort((a, b) => a.localeCompare(b));

  return (
    <div className="flex flex-wrap items-start justify-center gap-6 mt-6 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm ">
      {/* Category Filter */}
      <div className="flex flex-col items-center">
        <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
          <FiFilter className="text-blue-500" />
          Category
        </label>
        <select
          className="text-gray-600 text-sm rounded-xl border-gray-300 px-4 py-2 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categoryOptions.map((cat, idx) => (
            <option key={idx} value={cat === "All" ? "" : cat.toLowerCase()}>
              {cat === "All" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort By Filter */}
      <div className="flex flex-col items-center">
        <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
          <FiArrowDownCircle className="text-purple-500" />
          Sort By
        </label>
        <select
          className="text-gray-600 text-sm rounded-xl border-gray-300 px-4 py-2 bg-white shadow-sm focus:ring-purple-500 focus:border-purple-500"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
        >
          {sortOptions.map((sort) => (
            <option key={sort} value={sort.toLowerCase().replace(/ /g, "_")}>
              {sort}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FiltersPanel;
