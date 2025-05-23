import { Content, ZCOOL_KuaiLe } from "next/font/google";
import Button from "../../ui/Button";
import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import PostCard from "../../posts/PostCard";
import { Post } from "../../posts/PostTypes";

const ContentListings = async ({ listings }: any) => {
  const posts = await mockFetch("/api/posts");

  if (!posts) {
    return <div>No Posts Found</div>;
  }

  const postsData = posts.data;
  return (
    <section className="flex flex-col gap-4 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example listing item */}
        {postsData.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Load More Results Button */}
      <Button
        details={{
          text: "Load more results",
          css: "w-full my-6 py-4 bg-navy-blue-background text-white text-base font-bold",
        }}
      />
    </section>
  );
};
export default ContentListings;
// This component is a placeholder for the listings section of the services directory page.
