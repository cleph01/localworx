// MarketplaceItemCard.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CartItem,
  ListingContentType,
  ListingHeaderType,
  ListingFooterType,
  MarketplaceItem,
} from "./marketplaceTypes";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import Card from "../ui/Card";

type MarketplaceItemCardProps = {
  item: MarketplaceItem;
};

const MarketplaceItemCard = ({ item }: MarketplaceItemCardProps) => {
  const router = useRouter();

  return (
    <Card
      Header={<ListingHeader {...item} />}
      Content={<ListingContent {...item} />}
      Footer={<ListingFooter {...item} />}
      className="w-full max-w-sm"
    />
  );
};

export default MarketplaceItemCard;

/* Marketplace Listing Header */

const ListingHeader = ({ title, mediaUrl, mediaType }: ListingHeaderType) => {
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

      {/* Title */}
      <h3 className="text-2xl font-bold mt-2 mb-3">{title}</h3>
    </div>
  );
};

/* Marketplace Listing Content */

const ListingContent = ({
  firstName,

  zapCount,
  businessName,
  businessRating,
  businessRatingCount,
  businessReviewCount,
  businessLocation,
  category,
  avatarUrl,
  description,
}: ListingContentType) => {
  return (
    <div className="flex flex-col justify-center gap-2 mt-2">
      {/* Business Details */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex flex-row items-start justify-between">
            {/* Business Name */}
            <div className="flex-1 text-lg font-semibold text-gray-800 ">
              {businessName}
            </div>
            <div className="flex-none text-sm text-gray-500">
              {category ? category : "Category not provided"}
            </div>
          </div>

          {/* Business Rating */}
          <div className="flex flex-col justify-center text-sm text-gray-500 gap-2 mt-2">
            <div className="">
              📍 {businessLocation ? businessLocation : "Location not provided"}
            </div>
            <div className="">
              ⭐️ <span className="font-semibold mr-1">{businessRating}</span>(
              {businessRatingCount} ratings)
            </div>
            <div className="">
              💬{" "}
              <span className="font-semibold mr-1">{businessReviewCount}</span>
              reviews
            </div>
          </div>
        </div>
      </div>
      {/* Item Description */}
      <div className="text-base text-gray-500 mt-2">{description}</div>
      {/* Re-Seller Profile Info */}
      <div className="flex flex-row items-center justify-between gap-2 border-t border-gray-200 pt-4">
        <div className="flex flex-row items-center gap-2">
          {/* Avatar */}
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src={avatarUrl}
            alt={firstName}
          />
          <div className="text-lg font-semibold mr-2">{firstName}</div>
        </div>
        <div className="text-sm text-gray-500 mr-2">
          ⚡️ <span className="font-semibold mr-1">{zapCount}</span>
          (Zaps Received){" "}
        </div>
      </div>
    </div>
  );
};

/* Service Listing Footer */
const ListingFooter = (item: MarketplaceItem) => {
  // Handle Add to Cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    const storedCart: CartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const index = storedCart.findIndex((cartItem) => cartItem.id === item.id);

    if (index === -1) {
      storedCart.push({
        id: item.id,
        name: item.title, // Map 'title' to 'name'
        price: parseFloat(item.price), // Ensure price is a number
        quantity: 1,
      });
      toast.success("🎉 Item added to cart!");
    } else {
      storedCart[index].quantity += 1;
      toast.info("🛒 Item already in cart — quantity increased.");
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
  };

  // Handle View Item
  const handleViewItem = () => {
    // Use useRouter inside the parent component and pass router as a prop if needed
    window.location.href = `/marketplace/${item.id}`;
  };

  return (
    <div className="flex flex-row items-center justify-between gap-4 mt-1">
      {/* Price */}
      <div className="text-blue-600 font-bold text-lg">
        <span className="text-orange-500">₿</span> {item.price}
      </div>

      <div className="flex gap-2">
        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-blue-700"
        >
          <FaShoppingCart /> Add
        </button>
        {/* View Item */}
        <button
          onClick={handleViewItem}
          className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-gray-300"
        >
          <FaEye /> View
        </button>
      </div>
    </div>
  );
};
