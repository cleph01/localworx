// post/[id]/page.tsx

import PostHeroSection from "../../components/post/PostHeroSection";
import PostBodySection from "../../components/post/PostBodySection";
import ZapStatsSection from "../../components/post/ZapStatsSection";
import AuthorPreviewSection from "../../components/post/AuthorPreviewSection";
import Footer from "../../components/Footer";
import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await mockFetch(`/api/post/${id}`);

  if (!post) {
    return <div>No Post Found</div>;
  }

  const postData = await post.data;

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
