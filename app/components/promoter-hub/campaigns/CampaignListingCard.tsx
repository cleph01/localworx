import Button from "../../ui/Button";
import Card from "../../ui/Card";
import {
  ListingContentType,
  ListingFooterType,
  ListingHeaderType,
  CampaignListingCardProps,
} from "./CampaignListingCardTypes";

const ServiceListingCard = ({ listing }: CampaignListingCardProps) => {
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

/* Service Listing Header */

const ListingHeader = ({
  businessName,
  mediaUrl,
  mediaType,
}: ListingHeaderType) => {
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
      {/* Title */}
      <h3 className="text-2xl font-bold mb-3">{businessName}</h3>
      {/* Media preview (image or embed) */}
      {mediaUrl && mediaType ? renderMediaPreview(mediaUrl, mediaType) : null}
    </div>
  );
};

/* Service Listing Content */
const ListingContent = ({
  firstName,
  rating,
  reviewCount,
  avatarUrl,
  description,
}: ListingContentType) => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {/* Promoter Info */}
      <div className="flex flex-row items-start justify-between gap-2">
        <div className="flex flex-row items-center mr-1 gap-2">
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src={avatarUrl}
            alt={firstName}
          />
          <div className="text-lg font-semibold mr-2">{firstName}</div>
        </div>

        <div className="flex flex-row items-center gap-1">
          <span className="text-xs ml-2">⭐</span>
          <span className="text-sm text-gray-500 font-semibold">{rating}</span>
          <span className="text-sm text-gray-400 ">
            {" "}
            ({reviewCount} reviews)
          </span>
        </div>
      </div>
      {/* Description */}
      <div className="text-base text-gray-600 mt-2">
        {description && description.length > 100
          ? `${description.slice(0, 100)}...`
          : description}
      </div>
    </div>
  );
};

const ListingFooter = ({ clicks, views, referrals }: ListingFooterType) => (
  <div className="flex flex-row items-center justify-between gap-4">
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
    {/* Zap Button */}
    <Button
      details={{
        text: "⚡️ Zap It!",
        css: "w-full my-6 py-2 bg-orange-500 text-white text-base font-bold",
      }}
    />
  </div>
);
