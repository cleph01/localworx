import { renderMediaPreview } from "@/app/lib/media/renderMediaPreview";

import LazyLoadWrapper from "../../ui/LazyLoadWrapper";

type MarketplaceItemCardHeaderType = {
  imageUrl: string;
  rewardName: string;
  description: string; // Optional description for future use
};

const MarketplaceItemCardHeader = ({
  imageUrl,
  rewardName,
  description,
}: MarketplaceItemCardHeaderType) => {
  //

  return (
    <div className="">
      <LazyLoadWrapper>
        {/* Media preview (image or embed) */}
        {imageUrl && renderMediaPreview(imageUrl, "image")}
      </LazyLoadWrapper>
      {/* Title */}
      <h3 className="text-2xl font-extrabold text-slate-800 mt-4 mb-2 leading-tight">
        {rewardName}
      </h3>
      {/* Item Description */}
      <p className="text-sm sm:text-lg text-gray-600 line-clamp-3 mt-2">
        {description}
      </p>
    </div>
  );
};

export default MarketplaceItemCardHeader;
