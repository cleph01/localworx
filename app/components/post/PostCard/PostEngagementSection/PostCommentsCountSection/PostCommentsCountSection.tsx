type PostCommentsSectionProps = {
  commentsCount: number;
};

const PostCommentsSection = ({ commentsCount }: PostCommentsSectionProps) => {
  return (
    <span className="inline-flex text-center justify-center gap-1 bg-blue-100 text-blue-700 px-2 py-1.5 rounded-full font-semibold">
      💬 {commentsCount}
    </span>
  );
};
export default PostCommentsSection;
