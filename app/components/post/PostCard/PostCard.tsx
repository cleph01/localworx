import { Post } from "@/types/post/postType";
import Card from "../../ui/Card";
import PostCardContent from "./PostCardContent";
import PostCardFooter from "./PostCardFooter";
import PostCardHeader from "./PostCardHeader";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card
      Header={
        <PostCardHeader
          mediaUrl={post.media_url ?? ""}
          mediaType={post.media_type}
          title={post.title}
        />
      }
      Content={
        <PostCardContent
          id={post.id}
          userId={post.user_id}
          description={post.description}
        />
      }
      Footer={
        <PostCardFooter
          userId={post.user_id}
          postId={post.id}
          publishDate={post.created_at}
        />
      }
      css="w-full max-w-sm"
    />
  );
};
export default PostCard;
