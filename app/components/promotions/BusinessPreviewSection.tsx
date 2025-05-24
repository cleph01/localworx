import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import { PromotionBusinessPreviewSectionProps } from "./promotionTypes";

// BusinessPreviewSection.tsx
const BusinessPreviewSection = async ({
  data,
}: PromotionBusinessPreviewSectionProps) => {
  const business = await mockFetch(`/api/businesses?id=${data.businessId}`);

  if (!business) {
    return <div>Business not found</div>;
  }
  const businessData = business.data[0];

  return (
    <section className="w-full max-w-4xl flex flex-col px-4 py-4 my-4 border-t border-gray-200">
      <h2 className="text-xl font-bold mb-2">
        🏢 About {businessData?.businessName}
      </h2>
      <p className="text-gray-600 mb-1">{businessData.description}</p>
      <p className="text-gray-500 text-sm">📍 {businessData.address}</p>
      <p className="text-gray-500 text-sm">⏰ {businessData.hours}</p>
      <p className="text-gray-500 text-sm">📧 {businessData.email}</p>
    </section>
  );
};
export default BusinessPreviewSection;
