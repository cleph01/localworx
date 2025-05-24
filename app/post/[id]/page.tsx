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

  const post = await mockFetch(`/api/posts/${id}`);

  if (!post) {
    return <div>No Post Found</div>;
  }

  const postData = await post.data;

  // Organize the data I want to pass as props
  const heroSectiondData = {
    title: postData.title,
    firstName: postData.businessName || "Business Name",
    mediaUrl: postData.mediaUrl || "/placeholder-image.jpg",
    mediaType: postData.mediaType || "image",
  };

  const bodySectionData = {
    description: postData.description,
  };

  const zapsSectionData = {
    userId: postData.userId,
  };

  const authorPreviewSectionData = {
    userId: postData.userId,
  };

  console.log("PostData @ post/[id]: ", postData);

  return (
    <main className="min-h-screen flex flex-col items-center">
      <PostHeroSection data={heroSectiondData} />
      <PostBodySection data={bodySectionData} />
      <ZapStatsSection data={zapsSectionData} />
      <AuthorPreviewSection data={authorPreviewSectionData} />
      <Footer />
    </main>
  );
}
