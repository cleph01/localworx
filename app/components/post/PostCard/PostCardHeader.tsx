import { renderMediaPreview } from "@/app/lib/media/renderMediaPreview";
import LazyLoadWrapper from "../../ui/LazyLoadWrapper";

type PostCardHeaderType = {
  mediaUrl: string;
  mediaType: "image" | "video" | null;
  title: string;
};

const PostCardHeader = ({ mediaUrl, mediaType, title }: PostCardHeaderType) => {
  // Render the header with business name and media preview
  return (
    <div className="">
      {/* Media preview (image or embed) */}
      {mediaType ? (
        <LazyLoadWrapper
          fallback={
            <div className="w-full h-64 mt-2 rounded-xl border border-gray-200 bg-gray-200 animate-pulse" />
          }
          delayMs={200}
          timeoutMs={5000}
        >
          {renderMediaPreview(mediaUrl, mediaType)}
        </LazyLoadWrapper>
      ) : null}
      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-4">
        {title}
      </h3>
    </div>
  );
};

export default PostCardHeader;
