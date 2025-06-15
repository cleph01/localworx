"use client";

import PostEngagementSection from "../PostEngagementSection/PostEngagementSection";
import useSWR from "swr";

type AuthorProfileSectionProps = {
  id: number | string;
  authorId: number | string;
  clientSideFetch?: boolean; // Optional prop to determine if client-side fetch is needed
};
const AuthorProfileSection = ({ id, authorId }: AuthorProfileSectionProps) => {
  // Client-side fetching of user by promoter ID
  // Generic fetcher function
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok)
        throw new Error("Promotion card promoter details response was not ok");
      return res.json();
    });

  const searchUrl = `/api/users/${authorId}`;

  const { data: user, error, isLoading } = useSWR(searchUrl, fetcher);

  if (isLoading) return <div className="text-gray-500">Loading...</div>;

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
        className="inline-block h-16 w-16 rounded-full ring-2 ring-white shadow-sm"
        src={user.avatar_url ?? ""}
        alt={user.first_name}
      />
      <div className="flex flex-col justify-center">
        <div className="text-lg font-semibold text-slate-700 pl-2">
          {user.first_name}
        </div>
        <PostEngagementSection userId={authorId} postId={id} />
      </div>
    </div>
  );
};

export default AuthorProfileSection;
