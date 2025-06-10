import Button from "../ui/Button";
import AuthorProfileSection from "./PostCard/AuthorProfileSection/AuthorProfileSection.server";

type PostFooterSectionProps = {
  postId: number | string;
  authorId: number | string;
};

const PostFooterSection = ({ postId, authorId }: PostFooterSectionProps) => {
  return (
    <div className="w-full max-w-4xl sm:min-w-225 px-4 mb-8 flex flex-col gap-2">
      <p className="text-sm text-gray-500">Community contributor</p>
      <AuthorProfileSection id={postId} authorId={authorId} />
      {/* CTA - Zap Button */}
      <Button
        details={{
          text: "⚡️ Zap It!",
          css: "w-full mt-4 py-2 bg-orange-500 text-white text-base font-bold",
        }}
      />
    </div>
  );
};
export default PostFooterSection;
