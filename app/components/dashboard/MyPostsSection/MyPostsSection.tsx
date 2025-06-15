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
      <section className="flex flex-col items-center justify-center gap-6 px-4 my-12">
        <h2 className="text-3xl font-bold text-center">Loading Listings...</h2>
        <p className="text-gray-500">
          Please wait while we fetch the listings.
        </p>
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
    <section className="max-w-4xl bg-white rounded-lg shadow-sm border p-6 mb-6">
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
