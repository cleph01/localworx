import { FaBtc } from "react-icons/fa";
import Card from "../ui/Card";
import BusinessViewButton from "./BusinessViewButton";
import {
  BusinessCardContentType,
  BusinessCardFooterType,
  BusinessCardHeaderType,
  BusinessCardProps,
} from "./businessCardTypes";
import BusinessReviewsSection from "./BusinessReviewsSection";
import IntroOfferSection from "./IntroOfferSection";
import LazyLoadWrapper from "../ui/LazyLoadWrapper";
import AvatarWrapper from "../ui/AvatarWrapper";

const BusinessCard = ({ business }: BusinessCardProps) => {
  return (
    <Card
      Header={<BusinessCardHeader {...business} />}
      Content={<BusinessCardContent {...business} />}
      Footer={<BusinessCardFooter {...business} />}
      css="w-full max-w-sm border border-gray-200 transition-shadow hover:shadow-xl"
    />
  );
};
export default BusinessCard;

//

const BusinessCardHeader = ({
  id,
  business_name,
  first_name,
  description,
  logo_url,
  zapCount,
}: BusinessCardHeaderType) => (
  <div className="flex flex-col gap-2">
    <div className="flex flex-row items-center justify-between gap-2">
      {/* Title */}
      <h3 className="flex-1 text-xl font-extrabold text-slate-800">
        {business_name}
      </h3>
      {/* business review */}
      <BusinessReviewsSection businessId={id} />
    </div>

    {/* Logo Avatar, name, rating in a row */}
    <div className="flex flex-row items-center gap-2 mt-2">
      <LazyLoadWrapper
        fallback={
          <div className="h-24 w-24 rounded-full bg-gray-200 rounded-full" />
        }
      >
        {/* Business Logo Avatar */}
        <AvatarWrapper css="w-24 h-24">
          <img
            className="w-full h-full object-cover ring-2 ring-white shadow-md"
            src={logo_url}
            alt={first_name}
          />
        </AvatarWrapper>
      </LazyLoadWrapper>

      {/* Business Owner FirstName  */}
      <div className="text-sm ml-2 line-clamp-3">{description}</div>

      {/* TODO: Show Zap Payments to Promoters if zapCount > 0 */}
      {zapCount && zapCount > 0 && (
        <span className="flex-1 text-sm font-semibold text-orange-500 bg-orange-50 px-1 py-1 rounded-full">
          ⚡️ {zapCount} <span className="text-xs">(Zap payouts)</span>
        </span>
      )}
    </div>
  </div>
);

const BusinessCardContent = ({
  id,
  address,
  city,
  state,
  hiring_promoters,
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
    {/* Zap Payouts */}

    <div className="flex items-center gap-2 text-sm font-semibold text-orange-500 bg-orange-50 px-1 py-1 rounded-full">
      <span className="text-lg">⚡️</span>
      <span>{`100`} Zap Payouts Made</span>
    </div>

    {/* Special Offers */}
    <IntroOfferSection businessId={id} />
  </div>
);

const BusinessCardFooter = async ({
  id,
  category_id,
}: BusinessCardFooterType) => {
  // const businesses = await mockFetch("/api/businesses");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const response = await fetch(`${baseUrl}/api/category/${category_id}`, {
    cache: "no-store", // optional: ensure fresh data in Server Components
  });

  const category = await response.json();

  if (!category) {
    console.log("No categories found for this business:", id);
  }

  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <div className="flex-1 inline-block text-center bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
        {category.name}
      </div>
      {/* View Item */}
      <BusinessViewButton businessId={id} />
    </div>
  );
};
