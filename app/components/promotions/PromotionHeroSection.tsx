// PromotionHeroSection.tsx

import { renderMediaPreview } from "@/app/lib/media/renderMediaPreview";
import LazyLoadWrapper from "../ui/LazyLoadWrapper";
import { PromotionHeroSectionProps } from "./promotionTypes";
import db from "@/db/db";
import NotFound from "@/app/not-found";

const PromotionHeroSection = async ({ data }: PromotionHeroSectionProps) => {
  // SSR: Fetch the business details from the database
  // Fetch the business details from the database
  const business = await db("businesses").where("id", data.business_id).first();

  if (!business) return NotFound();

  return (
    <section className="w-full px-4 max-w-4xl">
      {/* Media preview (image or embed) */}

      {data.media_url && data.media_type ? (
        <LazyLoadWrapper
          fallback={
            <div className="w-full h-64 mt-2 rounded-xl border border-gray-200 bg-gray-200 animate-pulse" />
          }
          delayMs={200}
          timeoutMs={5000}
        >
          {renderMediaPreview(data.media_url, data.media_type)}
        </LazyLoadWrapper>
      ) : null}
      <div className="py-4">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <p className="text-gray-500">{business.business_name}</p>
      </div>
    </section>
  );
};
export default PromotionHeroSection;
