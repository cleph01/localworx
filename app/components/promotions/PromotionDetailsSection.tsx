// PromotionDetailsSection.tsx

import { PromotionDetailsSectionProps } from "./promotionTypes";

const PromotionDetailsSection = ({ data }: PromotionDetailsSectionProps) => {
  return (
    <section className="w-full px-4 py-4 max-w-4xl">
      <h2 className="text-xl font-bold mb-2">📄 Details</h2>
      <p className="text-gray-700">{data.description}</p>

      {data.terms_and_conditions && (
        <div className="my-4 text-sm text-gray-600">
          <span className="font-bold">Terms:</span>{" "}
          {data.terms_and_conditions || "No specific terms."}
        </div>
      )}

      {data.expires_at && (
        <div className="mb-2 text-sm text-gray-500">
          ⏳ Expires: {new Date(data.expires_at).toLocaleDateString()}
        </div>
      )}
    </section>
  );
};
export default PromotionDetailsSection;
