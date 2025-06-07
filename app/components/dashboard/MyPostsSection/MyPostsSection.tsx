"use client";

import { useFetchPostsByAuthorId } from "@/app/hooks/dashboard/MyPostsSection/useFetchPostsByAuthorId";
import PostCard from "../../post/PostCard/PostCard";

type MyPostsSectionProps = {
  authorId: number | string; // The ID of the author whose posts to fetch
  clientSideFetch?: boolean; // Optional prop to determine if client-side fetch is needed
};
const MyPostsSection = ({ authorId, clientSideFetch }: MyPostsSectionProps) => {
  const { posts, loading, error } = useFetchPostsByAuthorId("1"); // Replace "1" with the actual user ID

  if (loading) {
    return (
      <div className="text-center text-gray-500">Loading your posts...</div>
    );
  }
  if (error) {
    console.error("Error fetching My posts:", error);
  }

  const myPosts = posts.filter((post) => post.is_active && !post.expires_at);

  return (
    <section className="max-w-4xl bg-white rounded-lg shadow-sm border p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">📝 Your Posts</h2>
      {myPosts.length ? (
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
