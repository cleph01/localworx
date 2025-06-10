"use client";
// This component is client-side only, so we can use hooks like useFetchMyBusinesses
import { useFetchBusinessById } from "@/app/hooks/dashboard/MyPromotionsSection/useFetchBusinessById";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function BusinessDetailsSection({
  businessId,
}: {
  businessId: number | string;
}) {
  const { business, loading, error } = useFetchBusinessById(businessId);

  if (loading) return <div className="text-gray-500 text-sm">Loading...</div>;
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
