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
      className="bg-navy-blue-background text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 hover:bg-opacity-80 cursor-pointer transition-colors"
    >
      <FaEye /> View
    </button>
  );
};

export default BusinessViewButton;
