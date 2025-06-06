import LazyLoadWrapper from "@/app/components/ui/LazyLoadWrapper";
import { renderMediaPreview } from "@/app/lib/media/renderMediaPreview";

type PromotionHeaderType = {
  title?: string;
  media_url?: string;
  media_type?: "image" | "video"; // Assuming media_type can be either image or video
};

const PromotionCardHeader = ({
  title,
  media_url,
  media_type,
}: PromotionHeaderType) => {
  //
  // Render the header with business name and media preview
  return (
    <div className="">
      {/* Media preview (image or embed) */}
      {media_url && media_type ? (
        <LazyLoadWrapper
          fallback={
            <div className="w-full h-64 mt-2 rounded-xl border border-gray-200 bg-gray-200 animate-pulse" />
          }
          delayMs={200}
          timeoutMs={5000}
        >
          {/* Render media preview based on type - imported from app/lib/media*/}
          {/* This function will determine if it's an image or video and render accordingly */}
          {renderMediaPreview(media_url, media_type)}
        </LazyLoadWrapper>
      ) : null}
      {/* Offer Description */}
      {/* Business Name */}
      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-4">
        {title}
      </h3>
    </div>
  );
};

export default PromotionCardHeader;
