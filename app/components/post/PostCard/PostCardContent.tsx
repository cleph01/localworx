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
      <div className="text-base sm:text-lg text-gray-600 mt-2 line-clamp-3">
        {description}
      </div>
      <div className="flex flex-col gap-2 border-t border-gray-400 mt-4 pt-4">
        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-semibold">
          🧠 Community Creator
        </span>

        <div className="flex flex-col mt-2">
          <AuthorProfileSection
            id={id}
            authorId={userId}
            clientSideFetch={clientSideFetch ?? false}
          />
        </div>
      </div>
    </div>
  );
};

export default PostCardContent;
