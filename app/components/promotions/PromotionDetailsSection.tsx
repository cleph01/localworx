// PromotionDetailsSection.tsx

import { PromotionDetailsSectionProps } from "./promotionTypes";

const PromotionDetailsSection = ({ data }: PromotionDetailsSectionProps) => {
  return (
    <section className="w-full px-4 py-4 max-w-4xl">
      <h2 className="text-xl font-bold mb-2">📄 Details</h2>
      <p className="text-gray-700">{data.description}</p>

      {data.termsAndConditions && (
        <div className="mt-4 text-sm text-gray-600">
          <span className="font-bold">Terms:</span>{" "}
          {data.termsAndConditions || "No specific terms."}
        </div>
      )}

      {data.expiresAt && (
        <div className="mt-2 text-sm text-gray-500">
          ⏳ Expires: {new Date(data.expiresAt).toLocaleDateString()}
        </div>
      )}
    </section>
  );
};
export default PromotionDetailsSection;
