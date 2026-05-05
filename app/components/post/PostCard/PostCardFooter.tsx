import Link from "next/link";
import { FaEye, FaBolt } from "react-icons/fa";

type PostFooterType = {
  userId: number | string;
  postId: number | string;
  publishDate?: string;
};

const PostCardFooter = ({ postId, publishDate }: PostFooterType) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Link
          href={`/post/${postId}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:border-brand-orange hover:text-brand-orange text-sm transition-colors"
        >
          <FaEye className="h-3.5 w-3.5" />
          View Post
        </Link>

        <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-brand-orange hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors">
          <FaBolt className="h-3.5 w-3.5" />
          Zap It
        </button>
      </div>

      <p className="text-xs text-gray-400">
        {publishDate ? new Date(publishDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
      </p>
    </div>
  );
};

export default PostCardFooter;
