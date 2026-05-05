"use client";

// MarketplaceItemListingsGridSection.tsx
import { useState } from "react";
import useSearch from "@/app/hooks/search/useSearch";

import MarketplaceItemCard from "./MarketplaceItemCard/MarketplaceItemCard";
import Button from "../ui/Button";
import SearchBarSection from "./SearchBarSection/SearchBarSection";

const MarketplaceItemListingsGridSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const { data, isLoading, error } = useSearch({
    resourceType: "marketplace",
    query: searchTerm,
    category,
    sortBy,
  });

  const results = data?.results ?? [];

  return (
    <section className="flex flex-col items-center justify-center gap-6 px-4 my-12">
      <h2 className="text-3xl font-bold text-center">Current Listings</h2>

      {/* Search Section */}
      <SearchBarSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg border border-gray-200 p-4 animate-pulse space-y-3">
              <div className="h-5 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
              <div className="h-20 w-full bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && results.length === 0 && (
        <section className="flex flex-col items-center justify-center gap-6 px-4 my-12">
          <h2 className="text-3xl font-bold text-center">No Listings Found</h2>
          <p className="text-gray-500">Check back later for new listings, or</p>
          <p className="text-gray-500">Try adjusting your search criteria.</p>
        </section>
      )}

      {!isLoading && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {results.map((item: any) => (
            <MarketplaceItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Load More Results Button */}
      <Button
        details={{
          text: "Load more results",
          css: "w-full my-6 py-4 bg-navy-blue-background text-white text-base font-bold",
        }}
      />
    </section>
  );
};

export default MarketplaceItemListingsGridSection;
