import Link from "next/link";
import { FaBtc } from "react-icons/fa";
import IntroOfferSection from "./IntroOfferSection";

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
    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 px-1 py-1">
      <span className="text-lg">📍</span>
      <span>{address}, {city} {state}</span>
    </div>

    {/* Hiring promoters badge */}
    {hiring_promoters && (
      <Link
        href={`/business/${id}`}
        className="flex items-center gap-2 text-xs font-semibold text-brand-orange bg-orange-50 px-2 py-1 rounded-full w-fit hover:bg-orange-100 transition-colors"
      >
        <FaBtc />
        <span>Hiring Promoters</span>
      </Link>
    )}

    {/* Special Offers */}
    <IntroOfferSection
      businessId={id}
      clientSideFetch={clientSideFetch ?? false}
    />
  </div>
);

export default BusinessCardContent;
