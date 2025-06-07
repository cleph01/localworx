import { useFetchUserById } from "@/app/hooks/users/useFetchUserById";
import db from "@/db/db";

type AuthorProfileSectionProps = {
  authorId: number | string;
};
const AuthorProfileSection = async ({
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
      <div className="text-base font-semibold text-slate-700">
        {user.first_name}
      </div>
    </div>
  );
};

export default AuthorProfileSection;
