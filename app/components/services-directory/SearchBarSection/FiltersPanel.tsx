"use client";

import { useFetchAllBusinessCategories } from "@/app/hooks/business-categories/useFetchAllBusinessCategories";
import { FiFilter, FiUserCheck, FiArrowDownCircle } from "react-icons/fi";
import useSWR from "swr";

type FiltersPanelProps = {
  category: string;
  onCategoryChange: (cat: string) => void;
  hiring: boolean;
  onHiringToggle: () => void;
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
  hiring,
  onHiringToggle,
  sortBy,
  onSortByChange,
}: FiltersPanelProps) => {
  // Client-side fetching of all businessCategories
  // Generic fetcher function
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok)
        throw new Error("Promtion card business response was not ok");
      return res.json();
    });

  const searchUrl = `/api/business-categories`;

  const {
    data: businessCategories,
    error,
    isLoading,
  } = useSWR(searchUrl, fetcher);

  if (isLoading) {
    return (
      <div className="w-full h-64 mt-2 rounded-xl border border-gray-200 bg-gray-200 animate-pulse" />
    );
  }

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories: {error.message}</div>;

  const categoryOptions = [
    ...businessCategories.map((cat: any) => cat.name),
    "All",
  ].sort((a, b) => a.localeCompare(b));

  return (
    <div className="flex flex-wrap items-start justify-center gap-6 mt-6 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm ">
      {/* Hiring Checkbox */}
      <div className="flex flex-col items-center">
        <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
          <FiUserCheck className="text-green-500" />
          Income Opportunities
        </label>
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={hiring}
            onChange={onHiringToggle}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600 ">Hiring Promoters</span>
        </label>
      </div>
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
