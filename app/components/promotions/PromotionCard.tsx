// PromotionCard.tsx
import Image from "next/image";
import Link from "next/link";
import { FaBolt, FaMapMarkerAlt, FaGift } from "react-icons/fa";

type PromotionCardProps = {
  promotion: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    businessName: string;
    location: string;
    introOffer?: string;
    expiresAt?: string;
  };
};

const PromotionCard = ({ promotion }: PromotionCardProps) => {
  return (
    <div className="bg-white shadow border rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-all duration-200">
      {/* Thumbnail */}
      <img
        src={promotion.imageUrl || "/placeholder-image.jpg"}
        alt={promotion.title}
        width={600}
        height={400}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Title */}
        <h3 className="text-xl font-bold text-navy-blue">{promotion.title}</h3>

        {/* Business Name + Location */}
        <p className="text-gray-600 text-sm flex items-center gap-2">
          <FaMapMarkerAlt className="text-gray-400" /> {promotion.businessName}{" "}
          – {promotion.location}
        </p>

        {/* Description */}
        <p className="text-gray-700 text-sm line-clamp-3">
          {promotion.description}
        </p>

        {/* Intro Offer */}
        {promotion.introOffer && (
          <div className="mt-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded inline-flex items-center gap-1 font-semibold">
            <FaGift className="text-yellow-500" />
            {promotion.introOffer}
          </div>
        )}

        {/* Expiry */}
        {promotion.expiresAt && (
          <p className="text-xs text-gray-400 mt-1">
            ⏳ Expires {new Date(promotion.expiresAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="px-4 py-3 border-t mt-auto">
        <Link
          href={`/promotions/${promotion.id}`}
          className="w-full text-center block bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition-colors duration-200"
        >
          View Promotion
        </Link>
      </div>
    </div>
  );
};

export default PromotionCard;
