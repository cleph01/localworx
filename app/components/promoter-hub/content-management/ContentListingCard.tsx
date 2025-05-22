"use client";

import Card from "../../ui/Card";
import {
  ListingContentType,
  ListingFooterType,
  ListingHeaderType,
  ContentListingCardProps,
} from "./ContentListingCardTypes";
import Button from "../../ui/Button";
import { FaEye } from "react-icons/fa";

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
    if (!mediaUrl) return null;

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

const ListingContent = ({
  id,
  firstName,
  avatarUrl,
  description,
}: ListingContentType) => {
  // Handle View Item
  const handleViewItem = () => {
    // Use useRouter inside the parent component and pass router as a prop if needed
    window.location.href = `/marketplace/${id}`;
  };

  return (
    <div className="flex flex-col">
      {/* Description */}
      <div className="text-base text-gray-600 mt-2">
        {description && description.length > 100 ? (
          <span>{description.slice(0, 100)}...</span>
        ) : (
          <span>{description}</span>
        )}
      </div>
      <div className="flex flex-col gap-2 border-t border-gray-400 mt-4 pt-4">
        <p className="text-gray-500 text-sm">Author:</p>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2 mt-1">
            <img
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src={avatarUrl}
              alt={firstName}
            />
            <div className="text-lg font-semibold mr-2">{firstName}</div>
          </div>

          {/* View Item */}
          <button
            onClick={handleViewItem}
            className="bg-gray-200 text-gray-800 px-3 py-1 h-10 rounded text-sm flex items-center gap-1 hover:bg-gray-300 cursor-pointer"
          >
            <FaEye /> View
          </button>
        </div>
      </div>
    </div>
  );
};

const ListingFooter = ({
  publishDate,
  zapCount,
  likes,
  comments,
}: ListingFooterType) => (
  <div className="flex flex-col gap-2">
    <div className="flex flew-row items-center justify-between">
      <div className="flex flex-row flex-1 items-center gap-2 mt-2">
        <div className="inline-flex text-base font-semibold mr-2">
          {/* <FaHeart className="text-red-400 text-xs mr-2" /> */}
          ⚡️ {zapCount}
        </div>
        <div className="inline-flex text-base font-semibold mr-2">
          {/* <FaHeart className="text-red-400 text-xs mr-2" /> */}
          👍 {likes}
        </div>
        <div className="inline-flex items-center text-base font-semibold mr-2">
          {/* <FaComment className="text-blue-200 text-xs mr-2" /> */}
          💬 {comments}
        </div>
      </div>

      <Button
        details={{
          text: "⚡️ Zap It!",
          css: "my-6 py-2 px-6 bg-orange-500 text-white text-base font-bold",
        }}
      />
    </div>
    {publishDate && (
      <div className="text-sm text-gray-500">
        Published on: {new Date(publishDate).toLocaleDateString()}
      </div>
    )}
  </div>
);
