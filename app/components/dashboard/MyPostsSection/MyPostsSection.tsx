"use client";

import PostCard from "../../post/PostCard/PostCard";
import useSWR from "swr";

type MyPostsSectionProps = {
  authorId: number | string; // The ID of the author whose posts to fetch
  clientSideFetch?: boolean; // Optional prop to determine if client-side fetch is needed
};
const MyPostsSection = ({ authorId, clientSideFetch }: MyPostsSectionProps) => {
  // Client-side fetching of Posts by Author ID
  // Generic fetcher function
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok) throw new Error("My posts response was not ok");
      return res.json();
    });

  const searchUrl = `/api/posts?authorId=${authorId}`;

  const { data: posts, error, isLoading } = useSWR(searchUrl, fetcher);

  if (isLoading) {
    return (
      <section className="w-full bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-6 animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error fetching My posts:", error);
  }

  const myPosts = posts?.filter(
    (post: any) => post.is_active && !post.expires_at
  );

  return (
    <section className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-4">📝 Your Posts</h2>
      {myPosts?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myPosts.map((post: any) => (
            <PostCard
              key={post.id}
              post={post}
              clientSideFetch={clientSideFetch}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          You haven’t published any posts yet.{" "}
          <a href="/post/create" className="text-blue-600 underline">
            Create one now
          </a>
          .
        </p>
      )}
    </section>
  );
};

export default MyPostsSection;
