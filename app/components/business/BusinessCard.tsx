import { FaBtc } from "react-icons/fa";
import Card from "../ui/Card";
import BusinessViewButton from "./BusinessViewButton";
import {
  BusinessCardContentType,
  BusinessCardFooterType,
  BusinessCardHeaderType,
  BusinessCardProps,
} from "./businessCardTypes";

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
  businessName,
  firstName,
  rating,
  reviewCount,
  logoUrl,
  zapCount,
}: BusinessCardHeaderType) => (
  <div className="flex flex-col gap-2">
    <div className="flex flex-row items-center justify-between gap-2">
      {/* Title */}
      <h3 className="flex-1 text-xl font-extrabold text-slate-800">
        {businessName}
      </h3>
      {/* business review */}
      <div className="flex flex-row flex-0 items-center gap-1">
        <span className="text-base ml-2">⭐</span>{" "}
        {/* <FaStar className="text-yellow-500" /> */}
        <span className="text-gray-500 font-bold">{rating}</span>
        <span className="text-gray-400"> ({reviewCount})</span>
      </div>
    </div>

    {/* User Avatar, name, rating in a row */}
    <div className="flex flex-row items-center gap-2 mt-2">
      <img
        className="inline-block h-12 w-12 rounded-full ring-2 ring-white shadow-md"
        src={logoUrl}
        alt={firstName}
      />
      {/* Business Owner FirstName  */}
      <div className="text-lg">{firstName}</div>

      {/* Show Zap Payments to Promoters if zapCount > 0 */}
      {zapCount && zapCount > 0 && (
        <span className="flex-1 text-sm font-semibold text-orange-500 bg-orange-50 px-1 py-1 rounded-full">
          ⚡️ {zapCount} <span className="text-xs">(Zap payouts)</span>
        </span>
      )}
    </div>
  </div>
);

const BusinessCardContent = ({
  businessHours,
  address,
  hiringPromoters,
  hasSpecialOffers,
  introOffer,
}: BusinessCardContentType) => (
  <div className="flex flex-col gap-2">
    {/* Business Hours */}
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span className="text-lg">
        {/* <FaBriefcase />*/}
        💼
      </span>
      <span>{businessHours}</span>
    </div>
    {/* Address */}
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span className="text-lg">
        {/* <FaMapMarkerAlt /> */}
        📍
      </span>
      <span>{address}</span>
    </div>
    {/* Bitcoin Accepted */}
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span className="text-lg">
        <FaBtc className="text-orange-500" />
      </span>
      <span>Hiring Promoters: {hiringPromoters ? "Yes" : "No"}</span>
    </div>
    {/* Special Offers */}
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span className="text-lg">
        {/* <FaRegHandshake /> */}
        🎁
      </span>
      <span>Currently {hasSpecialOffers ? "has" : "no"} Special Offers</span>
    </div>
    {/* Offer Details */}
    {hasSpecialOffers && (
      <div className="flex items-center gap-2 text-sm bg-yellow-50 text-yellow-800 px-3 py-2 rounded mb-2">
        <span className="font-bold flex-1">🎯 Offer:</span>
        <span className="flex-1">{introOffer}</span>
      </div>
    )}
  </div>
);

const BusinessCardFooter = ({ id, categories }: BusinessCardFooterType) => {
  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <div className="flex flex-wrap gap-1">
        {categories?.map((category) => (
          <div
            key={category}
            className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full"
          >
            {category}
          </div>
        ))}
      </div>
      {/* View Item */}
      <BusinessViewButton businessId={id} />
    </div>
  );
};
