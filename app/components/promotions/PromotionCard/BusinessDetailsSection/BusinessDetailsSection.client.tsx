"use client";
// This component is client-side only, so we can use hooks like useFetchMyBusinesses

import { FaMapMarkerAlt } from "react-icons/fa";
import useSWR from "swr";

export default function BusinessDetailsSection({
  businessId,
}: {
  businessId: number | string;
}) {
  // Client-side fetching of business by business ID
  // Generic fetcher function
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok)
        throw new Error("Promtion card business response was not ok");
      return res.json();
    });

  const searchUrl = `/api/business/${businessId}`;

  const { data: business, error, isLoading } = useSWR(searchUrl, fetcher);

  if (isLoading) {
    return <p className="text-gray-500">Loading business...</p>;
  }
  if (error)
    return (
      <div className="text-red-500 text-sm">Error loading business details</div>
    );
  if (!business)
    return <div className="text-gray-500 text-sm">No business data found</div>;

  return (
    // Business Details
    <div className="flex flex-col justify-between">
      <div className="flex flex-row items-center justify-between">
        {/* Business Name */}
        <p className="flex-1 text-gray-600 text-lg sm:text-xl font-semibold">
          {business?.business_name}
        </p>

        {/* Phone Number */}
        <p className="text-gray-600 text-xs">{business?.phone}</p>
      </div>
      {/* Address */}
      <div className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 mt-3 rounded-full">
        <FaMapMarkerAlt className="text-red-500 mr-1" />
        {business?.address}, {business?.city}, {business?.state}
      </div>
    </div>
  );
}
