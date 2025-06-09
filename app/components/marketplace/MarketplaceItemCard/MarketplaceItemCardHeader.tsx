import { renderMediaPreview } from "@/app/lib/media/renderMediaPreview";

type MarketplaceItemCardHeaderType = {
  title: string;
  mediaUrl: string;
};

const MarketplaceItemCardHeader = ({
  title,
  mediaUrl,
}: MarketplaceItemCardHeaderType) => {
  //
  // Render the header with business name and media preview
  return (
    <div className="">
      {/* Media preview (image or embed) */}
      {mediaUrl && renderMediaPreview(mediaUrl, "image")}

      {/* Title */}
      <h3 className="text-2xl font-extrabold text-slate-800 mt-4 mb-2 leading-tight">
        {title}
      </h3>
    </div>
  );
};

export default MarketplaceItemCardHeader;
