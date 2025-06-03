// app/components/promotions/PromotionCardClient.tsx
"use client";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";

const BusinessViewButton = ({ businessId }: { businessId: string }) => {
  const router = useRouter();

  const handleViewItem = () => {
    router.push(`/business/${businessId}`);
  };

  return (
    <button
      onClick={handleViewItem}
      className="w-full bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm flex items-center justify-center gap-1 hover:bg-gray-300 cursor-pointer"
    >
      <FaEye /> View Business Profile
    </button>
  );
};

export default BusinessViewButton;
