import PageHeader from "../components/ui/PageHeader";
import PostsGridSection from "../components/posts/PostsGridSection";
import Footer from "../components/Footer";
import { mockFetch } from "../utilities/mockDatabase/mockFetch";
import db from "@/db/db";

export default async function PostsPage() {
  // SSR: Fetch posts data from the database
  const posts = await db("posts").select("*").orderBy("created_at", "desc");

  if (!posts) {
    return <div>No Posts Found</div>;
  }
  console.log("Posts fetched:", posts);
  return (
    <main className="min-h-screen flex flex-col">
      <PageHeader />
      <PostsGridSection posts={posts} />
      <Footer />
    </main>
  );
}
