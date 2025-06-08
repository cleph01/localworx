"use client";

import { useFetchUserById } from "@/app/hooks/users/useFetchUserById";
import PostEngagementSection from "../PostEngagementSection/PostEngagementSection";

type AuthorProfileSectionProps = {
  id: number | string;
  authorId: number | string;
  clientSideFetch?: boolean; // Optional prop to determine if client-side fetch is needed
};
const AuthorProfileSection = ({ id, authorId }: AuthorProfileSectionProps) => {
  const { user, loading, error } = useFetchUserById(authorId);

  if (loading) {
    return <div className="text-gray-500">Loading...</div>;
  }
  if (error) {
    console.error("Error fetching author:", error);
    return <div className="text-red-500">Error loading author</div>;
  }
  if (!user) {
    return <div className="text-gray-500">Author not found</div>;
  }

  return (
    <div className="flex flex-row items-center gap-2">
      <img
        className="inline-block h-12 w-12 rounded-full ring-2 ring-white shadow-sm"
        src={user.avatar_url ?? ""}
        alt={user.first_name}
      />
      <div className="flex flex-col ">
        <div className="text-base font-semibold text-slate-700 pt-2 pl-2">
          {user.first_name}
        </div>
        <PostEngagementSection userId={authorId} postId={id} />
      </div>
    </div>
  );
};

export default AuthorProfileSection;
