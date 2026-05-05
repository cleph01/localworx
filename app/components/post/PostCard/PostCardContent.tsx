import AuthorProfileSection from "./AuthorProfileSection";
import { FaBolt } from "react-icons/fa";

type PostContentType = {
  id: number;
  userId: number | string;
  description: string;
  clientSideFetch?: boolean;
};

const PostCardContent = ({
  id,
  userId,
  description,
  clientSideFetch,
}: PostContentType) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-3 pb-3 border-b border-gray-100">
        {description}
      </p>

      {/* Badge */}
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange bg-orange-50 px-2.5 py-1 rounded-full w-fit">
        <FaBolt className="h-3 w-3" />
        Community Creator
      </span>

      <AuthorProfileSection
        id={id}
        authorId={userId}
        clientSideFetch={clientSideFetch ?? false}
      />
    </div>
  );
};

export default PostCardContent;
