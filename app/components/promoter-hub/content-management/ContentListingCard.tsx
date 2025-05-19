import { FaComment, FaHeart } from "react-icons/fa";
import Card from "../../ui/Card";
import {
  ListingContentType,
  ListingFooterType,
  ListingHeaderType,
  ContentListingCardProps,
} from "./ContentListingCardTypes";

const ServiceListingCard = ({ listing }: ContentListingCardProps) => {
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
  title,
  mediaUrl,
  mediaType,
  description,
}: ListingHeaderType) => {
  // Determine appropriate media preview component (image or embed)
  const renderMediaPreview = (
    mediaUrl: string,
    mediaType: string,
    title: string,
    description: string
  ) => {
    if (!mediaUrl && mediaType != "text") return null;

    if (mediaType === "text") {
      return (
        <div>
          <p className="text-base text-gray-500 mt-2">{description}</p>
        </div>
      );
    }
    // Check if the media type is an image
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
      {mediaType
        ? renderMediaPreview(
            mediaUrl || "",
            mediaType || "",
            title || "",
            description || ""
          )
        : null}
      {/* Title */}
      <h3 className="text-lg font-bold mt-2">{title}</h3>
    </div>
  );
};

const ListingContent = ({ likes, comments }: ListingContentType) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="inline-flex items-center text-base font-semibold mr-2">
        <FaHeart className="text-red-400 text-xs mr-2" /> {likes}
      </div>
      <div className="inline-flex items-center text-base font-semibold mr-2">
        <FaComment className="text-blue-200 text-xs mr-2" /> {comments}
      </div>
    </div>
  );
};

const ListingFooter = ({ publishDate }: ListingFooterType) => (
  <div className="flex flex-row gap-4 mt-1">
    {publishDate && (
      <div className="text-sm text-gray-500">
        Published on: {new Date(publishDate).toLocaleDateString()}
      </div>
    )}
  </div>
);
