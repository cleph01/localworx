// app/components/promotions/PromotionCardClient.tsx
"use client";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";

const PromotionViewButton = ({
  promotionId,
}: {
  promotionId: number | string;
}) => {
  const router = useRouter();

  const handleViewItem = () => {
    router.push(`/promotion/${promotionId}`);
  };

  return (
    <button
      onClick={handleViewItem}
      className="bg-gray-200 text-gray-800 px-3 py-1 border-gray-400 rounded text-sm flex items-center gap-1 hover:bg-gray-300 cursor-pointer"
    >
      <FaEye /> View
    </button>
  );
};

export default PromotionViewButton;
