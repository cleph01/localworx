// PostBodySection.tsx

import { PostBodySectionProps } from "@/app/components/posts/postTypes";

const PostBodySection = ({ data }: PostBodySectionProps) => {
  return (
    <section className="px-6 py-4 max-w-4xl">
      <h2 className="text-xl font-bold mb-2">📄 Description</h2>
      <p className="text-gray-700 whitespace-pre-line">{data.description}</p>
    </section>
  );
};

export default PostBodySection;
