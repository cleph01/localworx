import PromotionViewButton from "../PromotionViewButton";
import BusinessDetailsSection from "./BusinessDetailsSection";

// Define the prop types for PromotionCardContent
type PromotionContentType = {
  id?: number | string;
  business_id?: number | string;
  description: string;
  expires_at?: string | Date;
  clientSideFetch?: boolean;
};

const PromotionCardContent = ({
  id,
  business_id,
  description,
  expires_at,
  clientSideFetch,
}: PromotionContentType) => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {/* Business Details */}
      <BusinessDetailsSection
        businessId={business_id ?? ""}
        clientSideFetch={clientSideFetch ?? false}
      />

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
    </div>
  );
};

export default PromotionCardContent;
