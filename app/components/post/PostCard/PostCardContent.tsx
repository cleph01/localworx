import AuthorProfileSection from "./AuthorProfileSection";

type PostContentType = {
  id: number;
  userId: number | string;
  description: string;
  clientSideFetch?: boolean; // Optional prop to determine if client-side fetch is needed
};

const PostCardContent = ({
  id,
  userId,
  description,
  clientSideFetch,
}: PostContentType) => {
  return (
    <div className="flex flex-col">
      {/* Description */}
      <div className="text-base sm:text-lg text-gray-600 mb-4 pb-2 border-b border-gray-400 line-clamp-3">
        {description}
      </div>

      <div className="flex flex-row">
        <span className="flex-shrink text-xs text-blue-600 bg-blue-50 mb-2 px-2 py-0.5 rounded-full font-semibold">
          🧠 Community Creator
        </span>
      </div>

      <AuthorProfileSection
        id={id}
        authorId={userId}
        clientSideFetch={clientSideFetch ?? false}
      />
    </div>
  );
};

export default PostCardContent;
