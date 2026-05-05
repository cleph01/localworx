"use client";

import useSWR from "swr";

type FiltersPanelProps = {
  category: string;
  onCategoryChange: (cat: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
};

const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Newest", value: "newest" },
  { label: "Price ↑", value: "price_low_to_high" },
  { label: "Price ↓", value: "price_high_to_low" },
];

const chip =
  "px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer whitespace-nowrap";
const chipActive =
  "bg-navy-blue-background text-white border-navy-blue-background";
const chipInactive =
  "bg-white text-gray-500 border-gray-200 hover:border-brand-orange hover:text-brand-orange";

const FiltersPanel = ({
  category,
  onCategoryChange,
  sortBy,
  onSortByChange,
}: FiltersPanelProps) => {
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok) throw new Error("Failed to load categories");
      return res.json();
    });

  const { data: businessCategories, error, isLoading } = useSWR(
    "/api/business-categories",
    fetcher
  );

  if (isLoading) {
    return (
      <div className="mt-4 space-y-3 animate-pulse">
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 w-20 bg-gray-100 rounded-full" />
          ))}
        </div>
        <div className="flex gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-8 w-24 bg-gray-100 rounded-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) return null;

  const categoryOptions = [
    { label: "All", value: "" },
    ...businessCategories
      .map((cat: any) => ({ label: cat.name, value: cat.name.toLowerCase() }))
      .sort((a: { label: string }, b: { label: string }) =>
        a.label.localeCompare(b.label)
      ),
  ];

  return (
    <div className="mt-4 space-y-3">
      {/* Sort row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest w-14 shrink-0">
          Sort
        </span>
        {sortOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSortByChange(opt.value)}
            className={`${chip} ${sortBy === opt.value ? chipActive : chipInactive}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Category row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest w-14 shrink-0">
          Category
        </span>
        {categoryOptions.map((opt: { label: string; value: string }) => (
          <button
            key={opt.value}
            onClick={() => onCategoryChange(opt.value)}
            className={`${chip} ${category === opt.value ? chipActive : chipInactive}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FiltersPanel;
