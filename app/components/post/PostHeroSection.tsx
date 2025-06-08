// PostHeroSection.tsx

import { renderMediaPreview } from "@/app/lib/media/renderMediaPreview";

type PostHeroSectionProps = {
  title: string;
  mediaUrl?: string;
  mediaType?: string; // "image", "youtube", "vimeo", etc.
};

const PostHeroSection = ({
  title,
  mediaUrl,
  mediaType,
}: PostHeroSectionProps) => {
  return (
    <section className="w-full max-w-4xl px-4">
      {/* Media preview (image or embed) */}
      {mediaUrl && mediaType ? renderMediaPreview(mediaUrl, mediaType) : null}
      <div className="py-4">
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
    </section>
  );
};

export default PostHeroSection;
