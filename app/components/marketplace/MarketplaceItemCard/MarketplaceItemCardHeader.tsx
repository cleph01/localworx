import { renderMediaPreview } from "@/app/lib/media/renderMediaPreview";
import db from "@/db/db";
import LazyLoadWrapper from "../../ui/LazyLoadWrapper";

type MarketplaceItemCardHeaderType = {
  imageUrl: string;
  rewardName: string;
};

const MarketplaceItemCardHeader = async ({
  imageUrl,
  rewardName,
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
    </div>
  );
};

export default MarketplaceItemCardHeader;
