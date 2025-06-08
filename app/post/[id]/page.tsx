// post/[id]/page.tsx

import PostHeroSection from "../../components/post/PostHeroSection";
import PostBodySection from "../../components/post/PostBodySection";
import ZapStatsSection from "../../components/post/ZapStatsSection";
import PostFooterSection from "@/app/components/post/PostFooterSection";
import Footer from "../../components/Footer";
import db from "@/db/db";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await db("posts")
    .where({ id: Number(id) })
    .select("*")
    .first();

  if (!post) {
    return <div>No Post Found</div>;
  }

  const { title, description, media_url, media_type, user_id } = post;

  return (
    <main className="min-h-screen flex flex-col items-center">
      <PostHeroSection
        title={title}
        mediaUrl={media_url}
        mediaType={media_type}
      />
      <PostBodySection description={description} />
      <ZapStatsSection userId={user_id} />
      <PostFooterSection postId={id} authorId={user_id} />
      <Footer />
    </main>
  );
}
