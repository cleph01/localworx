import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";

// BusinessPreviewSection.tsx
const BusinessPreviewSection = async ({
  businessId,
}: {
  businessId: string;
}) => {
  const businessDetails = await mockFetch(`/api/businesses/${businessId}`);

  if (!businessDetails) {
    return <div>Business not found</div>;
  }
  const business = businessDetails.data;

  return (
    <section className="px-6 py-4 border-t border-gray-200">
      <h2 className="text-xl font-bold mb-2">🏢 About {business.name}</h2>
      <p className="text-gray-600 mb-1">{business.description}</p>
      <p className="text-gray-500 text-sm">
        📍 {business.address} | ⏰ {business.hours}
      </p>
      <p className="text-gray-500 text-sm">📧 {business.email}</p>
    </section>
  );
};
export default BusinessPreviewSection;
