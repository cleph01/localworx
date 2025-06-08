// PostBodySection.tsx

type PostBodySectionProps = {
  description: string;
};

const PostBodySection = ({ description }: PostBodySectionProps) => {
  return (
    <section className="px-4 mt-2 max-w-4xl">
      <h2 className="text-xl font-bold mb-2">📄 Description</h2>
      <p className="text-gray-700 whitespace-pre-line">{description}</p>
    </section>
  );
};

export default PostBodySection;
