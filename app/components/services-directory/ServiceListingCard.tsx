"use client";

import {
  FaBriefcase,
  FaBtc,
  FaEye,
  FaMapMarkerAlt,
  FaRegHandshake,
  FaStar,
} from "react-icons/fa";
import Card from "../ui/Card";
import {
  ListingContentType,
  ListingFooterType,
  ListingHeaderType,
  ServiceListingCardProps,
} from "./serviceListingTypes";

const ServiceListingCard = ({ business }: ServiceListingCardProps) => {
  return (
    <Card
      Header={<ListingHeader {...business} />}
      Content={<ListingContent {...business} />}
      Footer={<ListingFooter {...business} />}
      className="w-full max-w-sm"
    />
  );
};
export default ServiceListingCard;

//

const ListingHeader = ({
  businessName,
  firstName,
  rating,
  reviewCount,
  logoUrl,
  zapCount,
}: ListingHeaderType) => (
  <div className="flex flex-col gap-2">
    <div className="flex flex-row items-center justify-between gap-2">
      {/* Title */}
      <h3 className="flex-1 text-xl font-bold">{businessName}</h3>
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
        className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
        src={logoUrl}
        alt={firstName}
      />
      {/* Business Owner FirstName  */}
      <div className="text-lg">{firstName}</div>

      {/* Show Zap Payments to Promoters if zapCount > 0 */}
      {zapCount && zapCount > 0 && (
        <span className="text-gray-500 text-base">
          ⚡️ <span className="font-semibold">{zapCount}</span> (Zap payouts)
        </span>
      )}
    </div>
  </div>
);

const ListingContent = ({
  businessHours,
  address,
  hiringPromoters,
  hasSpecialOffers,
  introOffer,
}: ListingContentType) => (
  <div className="flex flex-col gap-2">
    {/* Business Hours */}
    <div className="flex flex-row items-center gap-2">
      <span className="font-bold">
        {/* <FaBriefcase />*/}
        💼
      </span>
      <span>{businessHours}</span>
    </div>
    {/* Address */}
    <div className="flex flex-row items-center gap-2">
      <span>
        {/* <FaMapMarkerAlt /> */}
        📍
      </span>
      <span>{address}</span>
    </div>
    {/* Bitcoin Accepted */}
    <div className="flex flex-row items-center gap-2">
      <span className="text-orange-500">{/* <FaBtc /> */}₿</span>
      <span>Hiring Promoters: {hiringPromoters ? "Yes" : "No"}</span>
    </div>
    {/* Special Offers */}
    <div className="flex flex-row items-center gap-2">
      <span>
        {/* <FaRegHandshake /> */}
        🎁
      </span>
      <span>Currently {hasSpecialOffers ? "has" : "no"} Special Offers</span>
    </div>
    {/* Offer Details */}
    {hasSpecialOffers && (
      <div className="flex flex-row items-center gap-2">
        <span className="font-bold">Offer Details:</span>
        <span>{introOffer}</span>
      </div>
    )}
  </div>
);

const ListingFooter = ({ id, categories }: ListingFooterType) => {
  // Handle View Item
  const handleViewItem = () => {
    // Use useRouter inside the parent component and pass router as a prop if needed
    window.location.href = `/business/${id}`;
  };

  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <div className="flex flex-wrap gap-1">
        {categories?.map((category) => (
          <div
            key={category}
            className="inline-block bg-gray-200 text-gray-400 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
          >
            {category}
          </div>
        ))}
      </div>
      {/* View Item */}
      <button
        onClick={handleViewItem}
        className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-gray-300"
      >
        <FaEye /> View
      </button>
    </div>
  );
};
