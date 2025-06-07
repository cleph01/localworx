type PostLikesCountSectionProps = {
  postId: number | string;
};

const PostLikesCountSection = ({ postId }: PostLikesCountSectionProps) => {
  const likes = 123; // This would typically come from props or state
  return (
    <span className="inline-flex text-center items-center justify-center gap-1 bg-green-100 text-green-700 px-1 py-0.5 rounded-full font-semibold">
      👍 {likes}
    </span>
  );
};

export default PostLikesCountSection;
