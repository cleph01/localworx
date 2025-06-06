import db from "@/db/db";
import { FaMapMarkerAlt } from "react-icons/fa";

const BusinessDetailsSection = async ({
  businessId,
}: {
  businessId: number | string;
}) => {
  // SSR: Fetch business data from the database
  const business = await db("businesses").where({ id: businessId }).first();

  if (!business)
    return <div className="text-gray-500 text-sm">No business data found</div>;

  return (
    // Business Details
    <div className="flex flex-col justify-between">
      <div className="flex flex-row items-center justify-between">
        {/* Business Name */}
        <p className="flex-1 text-slate-600 text-base font-semibold">
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
};

export default BusinessDetailsSection;
