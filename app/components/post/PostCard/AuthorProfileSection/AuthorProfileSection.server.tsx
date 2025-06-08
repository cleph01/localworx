import db from "@/db/db";
import PostEngagementSection from "../PostEngagementSection/PostEngagementSection";

type AuthorProfileSectionProps = {
  id: number | string;
  authorId: number | string;
};
const AuthorProfileSection = async ({
  id,
  authorId,
}: AuthorProfileSectionProps) => {
  const user = await db("users").where({ id: authorId }).select("*").first();

  if (!user) {
    return <div className="text-gray-500">Author not found</div>;
  }

  return (
    <div className="flex flex-row items-center gap-2 mt-1">
      <img
        className="inline-block h-16 w-16 rounded-full ring-2 ring-white shadow-sm"
        src={user.avatar_url ?? ""}
        alt={user.first_name}
      />
      <div className="flex flex-col justify-center">
        <div className="text-xl font-semibold text-slate-700 pl-2">
          {user.first_name}
        </div>
        <PostEngagementSection userId={authorId} postId={id} />
      </div>
    </div>
  );
};

export default AuthorProfileSection;
