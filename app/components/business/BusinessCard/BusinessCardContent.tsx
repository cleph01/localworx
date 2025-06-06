import { FaBtc } from "react-icons/fa";
import IntroOfferSection from "./IntroOfferSection";

// Define the prop types for BusinessCardContent
type BusinessCardContentType = {
  id: string;
  address: string;
  city: string;
  state: string;
  hiring_promoters: boolean;
  clientSideFetch?: boolean;
};

const BusinessCardContent = ({
  id,
  address,
  city,
  state,
  hiring_promoters,
  clientSideFetch,
}: BusinessCardContentType) => (
  <div className="flex flex-col gap-2">
    {/* Address */}
    <div className="flex items-center gap-2 text-sm text-gray-600 px-1 py-1">
      <span className="text-lg">
        {/* <FaMapMarkerAlt /> */}
        📍
      </span>
      <span>
        {address}, {city} {state}
      </span>
    </div>
    {/* Bitcoin Accepted */}
    <div className="flex items-center gap-2 text-sm text-gray-600 px-1 py-1">
      <span className="text-lg">
        <FaBtc className="text-orange-500" />
      </span>

      <span>Hiring Promoters: {hiring_promoters ? "Yes" : "No"}</span>
    </div>

    {/* TODO: Make Zap Payouts Component */}

    <div className="flex items-center gap-2 text-sm font-semibold text-orange-500 bg-orange-50 px-1 py-1 rounded-full">
      <span className="text-lg">⚡️</span>
      <span>{`100`} Zap Payouts Made</span>
    </div>

    {/* Special Offers */}
    <IntroOfferSection
      businessId={id}
      clientSideFetch={clientSideFetch ?? false}
    />
  </div>
);

export default BusinessCardContent;
