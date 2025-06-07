import { useFetchUserById } from "@/app/hooks/users/useFetchUserById";
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

  console.log("Fetched user @ AuthorProfile:", user);
  return (
    <div className="flex flex-row items-center gap-2 mt-1">
      <img
        className="inline-block h-12 w-12 rounded-full ring-2 ring-white shadow-sm"
        src={user.avatar_url ?? ""}
        alt={user.first_name}
      />
      <div className="flex flex-col">
        <div className="text-base font-semibold text-slate-700">
          {user.first_name}
        </div>
        <PostEngagementSection userId={authorId} postId={id} />
      </div>
    </div>
  );
};

export default AuthorProfileSection;
