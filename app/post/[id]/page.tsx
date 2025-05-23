// post/[id]/page.tsx

import PostHeroSection from "../../components/post/PostHeroSection";
import PostBodySection from "../../components/post/PostBodySection";
import ZapStatsSection from "../../components/post/ZapStatsSection";
import AuthorPreviewSection from "../../components/post/AuthorPreviewSection";
import Footer from "../../components/Footer";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${id}`);
  const post = await res.json();

  return (
    <main className="min-h-screen flex flex-col">
      <PostHeroSection post={post} />
      <PostBodySection post={post} />
      <ZapStatsSection zapCount={post.zapCount} />
      <AuthorPreviewSection author={post.author} avatarUrl={post.avatarUrl} />
      <Footer />
    </main>
  );
}
