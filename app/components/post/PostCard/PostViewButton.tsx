// app/components/promotions/PromotionCardClient.tsx
"use client";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";

type PostViewButtonProps = {
  postId: number | string;
};

const PostViewButton = ({ postId }: PostViewButtonProps) => {
  const router = useRouter();

  const handleViewItem = () => {
    router.push(`/post/${postId}`);
  };

  return (
    <button
      onClick={handleViewItem}
      className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-gray-300 cursor-pointer"
    >
      <FaEye /> View Post
    </button>
  );
};

export default PostViewButton;
