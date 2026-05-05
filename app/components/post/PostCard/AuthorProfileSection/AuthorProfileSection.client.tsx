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

  if (isLoading) return (
    <div className="flex items-center gap-2 animate-pulse">
      <div className="h-16 w-16 bg-gray-200 rounded-full shrink-0" />
      <div className="space-y-2">
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  );

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
        className="inline-block h-9 w-9 rounded-full ring-2 ring-white shadow-sm shrink-0"
        src={user.avatar_url ?? ""}
        alt={user.first_name}
      />
      <div className="flex flex-col justify-center">
        <div className="text-sm font-semibold text-foreground pl-2">
          {user.first_name}
        </div>
        <PostEngagementSection userId={authorId} postId={id} />
      </div>
    </div>
  );
};

export default AuthorProfileSection;
