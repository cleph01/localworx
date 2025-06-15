"use client";

import { useEffect, useState } from "react";

import SearchBarSection from "./SearchBarSection/SearchBarSection";
import PromotionCard from "./PromotionCard/PromotionCard";
import Button from "../ui/Button";

import { fetchPromotionListings } from "@/app/lib/promotions/fetchPromotionListings";

const PromotionListingsGridSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounced effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchPromotionListings(
        searchTerm,
        category,
        sortBy,
        setResults,
        setLoading
      );
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, category, sortBy]);

  return (
    <section className="flex flex-col items-center gap-4 mt-12 pb-8 px-4">
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

      {loading && (
        <section className="flex flex-col items-center justify-center gap-6 px-4 my-12">
          <h2 className="text-3xl font-bold text-center">
            Loading Listings...
          </h2>
          <p className="text-gray-500">
            Please wait while we fetch the listings.
          </p>
        </section>
      )}

      {(!results || (results.length === 0 && !loading)) && (
        <section className="flex flex-col items-center justify-center gap-6 px-4 my-12">
          <h2 className="text-3xl font-bold text-center">No Listings Found</h2>
          <p className="text-gray-500">Check back later for new listings, or</p>
          <p className="text-gray-500">Try adjusting your search criteria.</p>
        </section>
      )}

      {/* Listings Grid */}
      {results && (
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {/* Example listing item */}
          {results.map((promotion: any) => (
            <PromotionCard
              key={promotion.id}
              promotion={promotion}
              clientSideFetch={true}
            />
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
export default PromotionListingsGridSection;
// This component is a placeholder for the listings section of the services directory page.
