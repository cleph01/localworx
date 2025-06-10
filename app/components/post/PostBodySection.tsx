// PostBodySection.tsx

type PostBodySectionProps = {
  description: string;
};

const PostBodySection = ({ description }: PostBodySectionProps) => {
  return (
    <section className="px-4 mt-2 max-w-4xl sm:min-w-225">
      <p className="text-base sm:text-lg text-gray-600 whitespace-pre-line">
        {description}
      </p>
    </section>
  );
};

export default PostBodySection;
