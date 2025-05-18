import {
  FaBriefcase,
  FaBtc,
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

const ServiceListingCard = ({ listing }: ServiceListingCardProps) => {
  return (
    <Card
      Header={<ListingHeader {...listing} />}
      Content={<ListingContent {...listing} />}
      Footer={<ListingFooter {...listing} />}
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
  avatarUrl,
}: ListingHeaderType) => (
  <div className="">
    {/* Title */}
    <h3 className="text-xl">{businessName}</h3>
    {/* User Avatar, name, rating in a row */}
    <div className="flex flex-row items-center gap-2 mt-2">
      <img
        className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
        src={avatarUrl}
        alt={firstName}
      />
      <div>{firstName}</div>
      <div className="flex flex-row items-center gap-1">
        <span className="text-xs ml-2">⭐</span>{" "}
        {/* <FaStar className="text-yellow-500" /> */}
        <span className="text-sm text-gray-500">{rating}</span>
        <span className="text-gray-300"> ({reviewCount})</span>
      </div>
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
        <FaBriefcase />
      </span>
      <span>{businessHours}</span>
    </div>
    {/* Address */}
    <div className="flex flex-row items-center gap-2">
      <span>
        <FaMapMarkerAlt />
      </span>
      <span>{address}</span>
    </div>
    {/* Bitcoin Accepted */}
    <div className="flex flex-row items-center gap-2">
      <span>
        <FaBtc />
      </span>
      <span>Hiring Promoters: {hiringPromoters ? "Yes" : "No"}</span>
    </div>
    {/* Special Offers */}
    <div className="flex flex-row items-center gap-2">
      <span>
        <FaRegHandshake />
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

const ListingFooter = ({ categories }: ListingFooterType) => (
  <div className="flex flex-row items-center gap-2">
    {categories?.map((category) => (
      <div
        key={category}
        className="inline-block bg-gray-200 text-gray-400 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
      >
        {category}
      </div>
    ))}
  </div>
);
