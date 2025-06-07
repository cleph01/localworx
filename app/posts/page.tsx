import PageHeader from "../components/ui/PageHeader";
import PostsGridSection from "../components/posts/PostsGridSection";
import Footer from "../components/Footer";

export default function PostsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <PageHeader />
      <PostsGridSection />
      <Footer />
    </main>
  );
}
