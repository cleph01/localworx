import { redirect } from "next/navigation";
import { FaEye, FaMapMarkerAlt } from "react-icons/fa";
import Button from "../ui/Button";
import Card from "../ui/Card";
import {
  PromotionHeaderType,
  PromotionContentType,
  PromotionFooterType,
  PromotionCardProps,
} from "./promotionTypes";
import PromoterDetailsSection from "./PromoterDetailsSection";
import PromotionViewButton from "./PromotionViewButton";
import LazyLoadWrapper from "../ui/LazyLoadWrapper";
import { renderMediaPreview } from "@/app/lib/media/renderMediaPreview";
import db from "@/db/db";

const PromotionCard = ({ promotion }: PromotionCardProps) => {
  return (
    <Card
      Header={<PromotionHeader {...promotion} />}
      Content={<PromotionContent {...promotion} />}
      // Footer={<PromotionFooter {...promotion} />}
      css="w-full max-w-sm p-0 px-4"
    />
  );
};
export default PromotionCard;

/* Service Listing Header */

const PromotionHeader = ({
  title,
  media_url,
  media_type,
}: PromotionHeaderType) => {
  //
  // Render the header with business name and media preview
  return (
    <div className="">
      {/* Media preview (image or embed) */}
      {media_url && media_type ? (
        <LazyLoadWrapper
          fallback={
            <div className="w-full h-64 mt-2 rounded-xl border border-gray-200 bg-gray-200 animate-pulse" />
          }
          delayMs={200}
          timeoutMs={5000}
        >
          {/* Render media preview based on type - imported from app/lib/media*/}
          {/* This function will determine if it's an image or video and render accordingly */}
          {renderMediaPreview(media_url, media_type)}
        </LazyLoadWrapper>
      ) : null}
      {/* Offer Description */}
      {/* Business Name */}
      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-4">
        {title}
      </h3>
    </div>
  );
};

/* Service Listing Content */
const PromotionContent = async ({
  id,
  promoter_id,
  business_id,
  description,

  expires_at,
}: PromotionContentType) => {
  // const businesses = await mockFetch("/api/businesses");

  // SSR: Fetch the business details from the database
  // Fetch the business details from the database
  const business = await db("businesses").where("id", business_id).first();

  console.log("Business Data @ Promotion Card Content:", business);

  if (!business) {
    return <div>No business data found</div>;
  }

  return (
    <div className="flex flex-col gap-2 mt-2">
      {/* Business Name + Location */}
      <div className="flex flex-col justify-between">
        <div className="flex flex-row items-center justify-between">
          {/* Address */}

          <p className="flex-1 text-slate-600 text-base font-semibold">
            {business?.business_name}
          </p>

          {/* Phone Number */}
          <p className="text-gray-600 text-xs">{business?.phone}</p>
        </div>
        <div className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 mt-3 rounded-full">
          <FaMapMarkerAlt className="text-red-500 mr-1" />
          {business?.address}, {business?.city}, {business?.state}
        </div>
      </div>

      {/* Description */}
      <p className="text-base sm:text-lg text-gray-600 my-2 line-clamp-3">
        {description}
      </p>

      <div className="flex flex-row justify-between items-center">
        {/* Expiration Date */}
        {expires_at && (
          <div className="text-xs text-gray-500 ">
            ⏳ Expires: {new Date(expires_at).toLocaleDateString()}
          </div>
        )}
        {/* View Item */}
        <PromotionViewButton promotionId={id ?? ""} />
      </div>
      {/* Promoter Info */}
      <PromoterDetailsSection data={{ promoter_id: promoter_id ?? "" }} />
    </div>
  );
};

const PromotionFooter = ({ clicks, views, referrals }: PromotionFooterType) => {
  return (
    <div className="flex flex-row sm:flex-col items-center justify-between ">
      <div className="flex flex-row items-center justify-between mt-2 gap-4 mr-2">
        {/* Clicks */}
        <div className="flex flex-col gap-1">
          Clicks: <span className="font-bold">{clicks}</span>
        </div>
        {/* Views */}
        <div className="flex flex-col gap-1">
          Views: <span className="font-bold">{views}</span>
        </div>
        {/* Referrals */}
        <div className="flex flex-col gap-1">
          Referrals: <span className="font-bold">{referrals}</span>
        </div>
      </div>

      {/* CTA - Zap Button */}
      {/* Consider making the Zap Button it's own client component (i think) because 
      of the interactivity involved */}
      <Button
        details={{
          text: "⚡️ Zap It!",
          css: "w-full mt-4 py-2 bg-orange-500 hover:bg-orange-600 transition-colors text-white text-base font-semibold rounded-md",
        }}
      />
    </div>
  );
};
