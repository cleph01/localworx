import PostCommentsSection from "./PostCommentsCountSection/PostCommentsCountSection";
import PostLikesCountSection from "./PostLikesCountSection/PostLikesCountSection";
import ZapsCountSection from "./ZapsCountSection/ZapsCountSection";

type PostEngagementSectionProps = {
  userId: number | string;
  postId: number | string;
};

const PostEngagementSection = ({
  userId,
  postId,
}: PostEngagementSectionProps) => {
  // Temporary data for demonstration purposes
  // In a real application, this data would come from props or state
  const tempComments = [
    { id: 1, post_id: 101, created_at: "2024-06-01T10:00:00Z" },
    { id: 2, post_id: 101, created_at: "2024-06-02T12:30:00Z" },
    { id: 3, post_id: 102, created_at: "2024-06-03T15:45:00Z" },
  ];

  return (
    <div className="flex flex-row gap-2 text-xs text-gray-600 mt-2">
      <ZapsCountSection userId={userId} />
      <PostLikesCountSection postId={postId} />
      <PostCommentsSection
        commentsCount={
          tempComments.filter((comment) => comment.post_id === 101).length
        }
      />
    </div>
  );
};

export default PostEngagementSection;
