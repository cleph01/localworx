// PostHeroSection.tsx

import { PostHeroSectionProps } from "../posts/postTypes";

const PostHeroSection = ({ data }: PostHeroSectionProps) => {
  // Determine appropriate media preview component (image or embed)
  const renderMediaPreview = (mediaUrl: string, mediaType: string) => {
    if (!mediaUrl) return null;

    // Check if the media type is an image
    if (mediaType === "image") {
      return (
        <img
          src={mediaUrl}
          alt="Image Preview"
          className="w-full h-64 mt-2 rounded-md border border-gray-200"
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
          className="w-full h-64 mt-2 rounded-md border border-gray-200"
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
          className="w-full h-64 mt-2 rounded-md border border-gray-200"
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
          className="w-full h-64 mt-2 rounded-md border border-gray-200"
        />
      );
    }

    return (
      <p className="text-sm text-gray-500 mt-2">Unrecognized media format.</p>
    );
  };

  return (
    <section className="w-full max-w-4xl px-4">
      {/* Media preview (image or embed) */}
      {data.mediaUrl && data.mediaType
        ? renderMediaPreview(data.mediaUrl, data.mediaType)
        : null}
      <div className="py-4">
        <h1 className="text-3xl font-bold">{data.title}</h1>
      </div>
    </section>
  );
};

export default PostHeroSection;
