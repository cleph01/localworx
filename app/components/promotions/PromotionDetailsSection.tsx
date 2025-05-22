// PromotionDetailsSection.tsx

const PromotionDetailsSection = ({ promotion }: { promotion: any }) => {
  return (
    <section className="px-6 py-4">
      <h2 className="text-xl font-bold mb-2">📄 Details</h2>
      <p className="text-gray-700">{promotion.description}</p>

      {promotion.termsAndConditions && (
        <div className="mt-4 text-sm text-gray-600">
          <span className="font-bold">Terms:</span>{" "}
          {promotion.termsAndConditions || "No specific terms."}
        </div>
      )}

      {promotion.expiresAt && (
        <div className="mt-2 text-sm text-gray-500">
          ⏳ Expires: {new Date(promotion.expiresAt).toLocaleDateString()}
        </div>
      )}
    </section>
  );
};
export default PromotionDetailsSection;
