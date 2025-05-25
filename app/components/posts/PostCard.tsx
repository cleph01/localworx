import { PostContentType, PostFooterType, PostHeaderType } from "./postTypes";
import Button from "../ui/Button";
import { FaEye } from "react-icons/fa";
import { Post } from "./postTypes";
import Card from "../ui/Card";
import PostViewButton from "./PostViewButton";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card
      Header={<PostHeader {...post} />}
      Content={<PostContent {...post} />}
      Footer={<PostFooter {...post} />}
      css="w-full max-w-sm"
    />
  );
};
export default PostCard;

//

const PostHeader = ({
  title,
  mediaUrl,
  mediaType,
  description,
}: PostHeaderType) => {
  // Determine appropriate media preview component (image or embed)
  const renderMediaPreview = (
    mediaUrl: string,
    mediaType: string,
    title: string,
    description: string
  ) => {
    if (!mediaUrl) return null;

    // Check if the media type is an image
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
      <p className="w-full h-64 mt-2 rounded-md border border-gray-200">
        Unrecognized media format.
      </p>
    );
  };
  //
  // Render the header with business name and media preview
  return (
    <div className="">
      {/* Media preview (image or embed) */}
      {mediaType
        ? renderMediaPreview(
            mediaUrl || "",
            mediaType || "",
            title || "",
            description || ""
          )
        : null}
      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-4">
        {title}
      </h3>
    </div>
  );
};

const PostContent = ({
  id,
  firstName,
  avatarUrl,
  description,
}: PostContentType) => {
  return (
    <div className="flex flex-col">
      {/* Description */}
      <div className="text-base sm:text-lg text-gray-600 mt-2 line-clamp-3">
        {description}
      </div>
      <div className="flex flex-col gap-2 border-t border-gray-400 mt-4 pt-4">
        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-semibold">
          🧠 Community Creator
        </span>

        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2 mt-1">
            <img
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white shadow-sm"
              src={avatarUrl}
              alt={firstName}
            />
            <div className="text-base font-semibold text-slate-700">
              {firstName}
            </div>
          </div>

          {/* View Item */}
          <PostViewButton postId={id ?? ""} />
        </div>
      </div>
    </div>
  );
};

const PostFooter = ({
  publishDate,
  zapCount,
  likes,
  comments,
}: PostFooterType) => (
  <div className="flex flex-col gap-2">
    <div className="flex flew-row items-center justify-between">
      <div className="flex flex-row flex-1 items-center gap-1 mt-2 mr-1">
        <div className="flex flex-row gap-2 text-xs text-gray-600 mt-2">
          <span className="inline-flex text-center justify-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1.5 rounded-full font-semibold">
            ⚡ {zapCount}
          </span>
          <span className="inline-flex text-center justify-center gap-1 bg-green-100 text-green-700 px-2 py-1.5 rounded-full font-semibold">
            👍 {likes}
          </span>
          <span className="inline-flex text-center justify-center gap-1 bg-blue-100 text-blue-700 px-2 py-1.5 rounded-full font-semibold">
            💬 {comments}
          </span>
        </div>
      </div>

      <Button
        details={{
          text: "⚡️ Zap It!",
          css: "my-6 py-2 px-4 bg-orange-500 hover:bg-orange-600 transition-all text-white text-base font-bold rounded-md",
        }}
      />
    </div>
    {publishDate && (
      <div className="text-sm text-gray-500">
        Published on: {new Date(publishDate).toLocaleDateString()}
      </div>
    )}
  </div>
);
