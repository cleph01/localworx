// PostHeroSection.tsx

const PostHeroSection = ({ post }: { post: any }) => {
  return (
    <section className="w-full">
      {post.mediaUrl && (
        <img
          src={post.mediaUrl}
          alt={post.title}
          width={1200}
          height={500}
          className="w-full h-64 object-cover"
        />
      )}
      <div className="px-6 py-4">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-gray-500 text-sm">
          {post.subtitle || "Posted on LocalWorx"}
        </p>
      </div>
    </section>
  );
};

export default PostHeroSection;
