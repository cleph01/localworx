import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import { PromotionBusinessPreviewSectionProps } from "./promotionTypes";
import db from "@/db/db";
import NotFound from "@/app/not-found";

// BusinessPreviewSection.tsx
const BusinessPreviewSection = async ({
  data,
}: PromotionBusinessPreviewSectionProps) => {
  // SSR: Fetch the business details from the database
  // Fetch the business details from the database
  const business = await db("businesses").where("id", data.business_id).first();

  console.log("Business Data @ BusinessPreviewSection:", business);
  if (!business) return <div>Business details not found</div>;

  return (
    <section className="w-full max-w-4xl flex flex-col px-4 py-4 mt-4 mb-1 border-t border-gray-200">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">
        🏢 About {business?.business_name}
      </h2>
      <p className="text-base sm:text-lg text-gray-600 mb-2">
        {business?.description}
      </p>
      <p className="text-gray-500 text-sm sm:text-base">
        <span className="text-sm sm:text-lg mr-1">📍</span>
        {business?.address}, {business?.city}, {business?.state}
      </p>

      <p className="text-gray-500 text-sm sm:text-base">
        <span className="text-sm sm:text-lg mr-1">📧</span>
        {business?.email}
      </p>
    </section>
  );
};
export default BusinessPreviewSection;
