// PostGridSection.tsx
import PostCard from "./PostCard";
import { PostsGridSectionProps } from "./postTypes";

const PostsGridSection = ({ posts }: PostsGridSectionProps) => {
  return (
    <section className="px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">📝 Community Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default PostsGridSection;
