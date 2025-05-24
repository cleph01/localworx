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

const PromotionCard = ({ promotion }: PromotionCardProps) => {
  console.log("Promotion @ promotionCard: ", promotion);
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
  mediaUrl,
  mediaType,
}: PromotionHeaderType) => {
  // Determine appropriate media preview component (image or embed)
  const renderMediaPreview = (mediaUrl: string, mediaType: string) => {
    if (!mediaUrl) return null;

    if (mediaType === "image") {
      return (
        <img
          src={mediaUrl}
          alt="Image Preview"
          className="w-full max-h-64 object-cover mt-2"
        />
      );
    }

    // Match common YouTube and Vimeo patterns
    const youTubeMatch = mediaUrl.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
    );
    const vimeoMatch = mediaUrl.match(/vimeo\.com\/(\d+)/);

    if (youTubeMatch) {
      const id = youTubeMatch[1];
      return (
        <iframe
          className="w-full h-64 mt-2"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube Preview"
          allowFullScreen
        />
      );
    }

    if (vimeoMatch) {
      const id = vimeoMatch[1];
      return (
        <iframe
          className="w-full h-64 mt-2"
          src={`https://player.vimeo.com/video/${id}`}
          title="Vimeo Preview"
          allowFullScreen
        />
      );
    }

    // Basic image preview fallback
    if (mediaUrl.match(/\.(jpeg|jpg|gif|png|webp)$/)) {
      return (
        <img
          src={mediaUrl}
          alt="Image Preview"
          className="w-full max-h-64 object-cover mt-2"
        />
      );
    }

    return (
      <p className="text-sm text-gray-500 mt-2">Unrecognized media format.</p>
    );
  };
  //
  // Render the header with business name and media preview
  return (
    <div className="">
      {/* Media preview (image or embed) */}
      {mediaUrl && mediaType ? renderMediaPreview(mediaUrl, mediaType) : null}
      {/* Offer Description */}
      {/* Business Name */}
      <h3 className="text-xl font-bold mt-4">{title}</h3>
    </div>
  );
};

/* Service Listing Content */
const PromotionContent = ({
  id,
  promoterId,
  businessName,
  description,
  address,
  city,
  state,
  phone,
  expiresAt,
}: PromotionContentType) => {
  // Handle View Item
  const handleViewItem = () => {
    //
    // can't use useRouter in a server component
    redirect(`/promotion/${id}`);
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      {/* Business Name + Location */}
      <div className="flex flex-col justify-between">
        <div className="flex flex-row items-center justify-between">
          {/* Address */}
          <div className="flex flex-row items-center">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <p className="flex-1 text-gray-600 text-base flex items-center gap-2">
              {businessName}
            </p>
          </div>
          {/* Phone Number */}
          <p className="text-gray-600 text-xs">{phone}</p>
        </div>
        <p className="text-xs mt-1">
          {address}
          {", "}
          {city}
          {", "}
          {state}
        </p>
      </div>

      {/* Description */}
      <p className="text-base text-gray-600 my-2">
        {description && description.length > 100
          ? `${description.slice(0, 100)}...`
          : description}
      </p>

      <div className="flex flex-row justify-between items-start">
        {/* Expiration Date */}
        {expiresAt && (
          <div className="text-sm text-gray-500 ">
            ⏳ Expires: {new Date(expiresAt).toLocaleDateString()}
          </div>
        )}
        {/* View Item */}
        <PromotionViewButton promotionId={id ?? ""} />
      </div>
      {/* Promoter Info */}
      <PromoterDetailsSection data={{ promoterId: promoterId ?? "" }} />
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
          css: "w-full mt-4 py-2 bg-orange-500 text-white text-base font-bold",
        }}
      />
    </div>
  );
};
