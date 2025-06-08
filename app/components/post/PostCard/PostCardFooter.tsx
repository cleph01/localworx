import Button from "../../ui/Button";

import PostViewButton from "./PostViewButton";

type PostFooterType = {
  userId: number | string;
  postId: number | string;
  publishDate?: string;
};

const PostCardFooter = ({ postId, publishDate }: PostFooterType) => {
  return (
    <div className="flex flex-col">
      <div className="flex flew-row items-center justify-between">
        {/* View Item */}
        <PostViewButton postId={postId ?? ""} />

        <Button
          details={{
            text: "⚡️ Zap It!",
            css: "flex-1 ml-2 my-6 py-2 px-4 bg-orange-500 hover:bg-orange-600 transition-all text-white text-base font-bold rounded-md",
          }}
        />
      </div>
      {/* Post created_at field */}
      <div className="text-sm text-gray-500">
        Published on:{" "}
        {publishDate ? new Date(publishDate).toLocaleDateString() : "Unknown"}
      </div>
    </div>
  );
};

export default PostCardFooter;
