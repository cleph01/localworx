"use client";

import { useState } from "react";

import SearchBarSection from "./SearchBarSection/SearchBarSection";
import BusinessCard from "../business/BusinessCard/BusinessCard";
import Button from "../ui/Button";

import useSearch from "@/app/hooks/search/useSearch";

const BusinessListingsGridSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [hiring, setHiring] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const { data, isLoading, error } = useSearch({
    resourceType: "services",
    query: searchTerm,
    category,
    isHiring: hiring,
  });

  if (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <section className="flex flex-col gap-4 py-12 px-6 ">
      <h2 className="text-2xl font-bold">Service Listings</h2>
      {/* Search Section */}
      <SearchBarSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
        hiring={hiring}
        setHiring={setHiring}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {isLoading && (
        <section className="flex flex-col items-center justify-center gap-6 px-4 my-12">
          <h2 className="text-3xl font-bold text-center">
            Loading Listings...
          </h2>
          <p className="text-gray-500">
            Please wait while we fetch the listings.
          </p>
        </section>
      )}

      {(!data?.results || (data?.results.length === 0 && !isLoading)) && (
        <section className="flex flex-col items-center justify-center gap-6 px-4 my-12">
          <h2 className="text-3xl font-bold text-center">No Listings Found</h2>
          <p className="text-gray-500">Check back later for new listings, or</p>
          <p className="text-gray-500">Try adjusting your search criteria.</p>
        </section>
      )}

      {/* Listings Grid */}
      {data?.results && (
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Example listing item */}
          {data.results.map((business: any) => (
            <BusinessCard
              key={business.id}
              business={business}
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
export default BusinessListingsGridSection;
// This component is a placeholder for the listings section of the services directory page.
