// PromotionHeroSection.tsx

import LazyLoadWrapper from "../ui/LazyLoadWrapper";
import { PromotionHeroSectionProps } from "./promotionTypes";

const PromotionHeroSection = ({ data }: PromotionHeroSectionProps) => {
  // Determine appropriate media preview component (image or embed)

  const renderMediaPreview = (mediaUrl: string, mediaType: string) => {
    if (!mediaUrl) return null;

    if (mediaType === "image") {
      return (
        <img
          src={mediaUrl}
          alt="Image Preview"
          className="w-full h-64 mt-2 rounded-xl border border-gray-200 object-cover shadow-sm"
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
          className="w-full h-64 mt-2 rounded-xl border border-gray-200 object-cover shadow-sm"
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
          className="w-full h-64 mt-2 rounded-xl border border-gray-200 object-cover shadow-sm"
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
          className="w-full h-64 mt-2 rounded-xl border border-gray-200 object-cover shadow-sm"
        />
      );
    }

    return (
      <p className="text-sm text-gray-500 mt-2">Unrecognized media format.</p>
    );
  };

  return (
    <section className="w-full px-4 max-w-4xl">
      {/* Media preview (image or embed) */}

      {data.mediaUrl && data.mediaType ? (
        <LazyLoadWrapper
          fallback={
            <div className="w-full h-64 mt-2 rounded-xl border border-gray-200 bg-gray-200 animate-pulse" />
          }
          delayMs={200}
          timeoutMs={5000}
        >
          {renderMediaPreview(data.mediaUrl, data.mediaType)}
        </LazyLoadWrapper>
      ) : null}
      <div className="py-4">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <p className="text-gray-500">{data.businessName}</p>
      </div>
    </section>
  );
};
export default PromotionHeroSection;
