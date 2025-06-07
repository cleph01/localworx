// PostGridSection.tsx
import { Post } from "@/types/post/postType";
import PostCard from "../post/PostCard/PostCard";
import db from "@/db/db";

type PostsGridSectionProps = {
  clientSideFetch?: boolean; // Optional prop to determine if the fetch should be client-side
};

const PostsGridSection = async ({ clientSideFetch }: PostsGridSectionProps) => {
  // SSR: Fetch posts data from the database
  const posts = await db("posts").select("*").orderBy("created_at", "desc");

  if (!posts) {
    return <div>No Posts Found</div>;
  }
  console.log("Posts fetched:", posts);

  return (
    <section className="px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">📝 Community Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: Post) => (
          <PostCard
            key={post.id}
            post={post}
            clientSideFetch={clientSideFetch}
          />
        ))}
      </div>
    </section>
  );
};

export default PostsGridSection;
