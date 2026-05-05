"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import SearchBarSection from "./SearchBarSection/SearchBarSection";
import BusinessCard from "../business/BusinessCard/BusinessCard";
import Button from "../ui/Button";
import useSearch from "@/app/hooks/search/useSearch";

// Dynamically import the map so it never SSR-renders (Google Maps requires browser)
const BusinessDiscoveryMap = dynamic(
  () => import("../maps/BusinessDiscoveryMap"),
  { ssr: false, loading: () => <div className="w-full rounded-xl bg-gray-100 animate-pulse" style={{ height: "420px" }} /> }
);

const BusinessListingsGridSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [hiring, setHiring] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [showMap, setShowMap] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | undefined>();

  // Ask for geolocation once on mount to center the map
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {} // silently fall back to FALLBACK_CENTER in the map component
    );
  }, []);

  const { data, isLoading, error } = useSearch({
    resourceType: "services",
    query: searchTerm,
    category,
    isHiring: hiring,
  });

  if (error) {
    console.error("Error fetching data:", error);
  }

  const results = data?.results ?? [];

  return (
    <section className="flex flex-col gap-4 py-12 px-6">
      {/* Map */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-2xl font-bold">Find Local Services</h2>
        <button
          onClick={() => setShowMap((v) => !v)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          {showMap ? "Hide Map" : "Show Map"}
        </button>
      </div>

      {showMap && (
        <BusinessDiscoveryMap
          businesses={results}
          defaultCenter={userLocation}
        />
      )}

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {!isLoading && results.length === 0 && (
        <section className="flex flex-col items-center justify-center gap-4 py-16">
          <h2 className="text-2xl font-bold text-center">No Listings Found</h2>
          <p className="text-gray-500 text-sm text-center">
            Try adjusting your search or check back later for new listings.
          </p>
        </section>
      )}

      {results.length > 0 && (
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((business: any) => (
            <BusinessCard
              key={business.id}
              business={business}
              clientSideFetch={true}
            />
          ))}
        </div>
      )}

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
