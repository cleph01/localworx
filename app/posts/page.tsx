import PageHeader from "../components/ui/PageHeader";
import PostsGridSection from "../components/posts/PostsGridSection";
import Footer from "../components/Footer";
import { mockFetch } from "../utilities/mockDatabase/mockFetch";

export default async function PostsPage() {
  const res = await mockFetch("/api/posts");
  const posts = await res.data;

  if (!posts) {
    return <div>No Posts Found</div>;
  }
  return (
    <main className="min-h-screen flex flex-col">
      <PageHeader />
      <PostsGridSection posts={posts} />
      <Footer />
    </main>
  );
}
