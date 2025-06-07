import { Post } from "@/types/post/postType";
import Card from "../../ui/Card";
import PostCardContent from "./PostCardContent";
import PostCardFooter from "./PostCardFooter";
import PostCardHeader from "./PostCardHeader";

type PostCardProps = {
  post: Post;
  clientSideFetch?: boolean; // Optional prop for client-side fetching
};

const PostCard = ({ post, clientSideFetch }: PostCardProps) => {
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
          clientSideFetch={clientSideFetch} // Pass the prop to PostCardContent
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
