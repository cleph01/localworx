// AuthorPreviewSection.tsx

const AuthorPreviewSection = ({
  author,
  avatarUrl,
}: {
  author: string;
  avatarUrl: string;
}) => {
  return (
    <section className="px-6 py-4 flex items-center gap-4 border-t border-gray-200">
      <img
        src={avatarUrl}
        alt={author}
        className="w-12 h-12 rounded-full ring-2 ring-white"
      />
      <div>
        <p className="font-bold text-gray-700">By {author}</p>
        <p className="text-sm text-gray-500">Community contributor</p>
      </div>
    </section>
  );
};
export default AuthorPreviewSection;
