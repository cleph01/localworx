// PostBodySection.tsx

const PostBodySection = ({ post }: { post: any }) => {
  return (
    <section className="px-6 py-4">
      <h2 className="text-xl font-bold mb-2">📄 Content</h2>
      <p className="text-gray-700 whitespace-pre-line">{post.body}</p>
    </section>
  );
};

export default PostBodySection;
