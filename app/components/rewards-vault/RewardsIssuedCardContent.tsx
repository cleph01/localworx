import { useFetchBusinessById } from "@/app/hooks/dashboard/MyPromotionsSection/useFetchBusinessById";

type RewardsIssuedCardContentProps = {
  businessId: number | string;
};

const RewardsIssuedCardContent = ({
  businessId,
}: RewardsIssuedCardContentProps) => {
  const { business, loading, error } = useFetchBusinessById(businessId);

  if (loading) {
    return (
      <div className="w-full h-64 mt-2 rounded-xl border border-gray-200 bg-gray-200 animate-pulse" />
    );
  }
  if (error) {
    console.error("Error fetching business:", error);
    return <div className="text-red-500">Error loading business</div>;
  }
  if (!business) {
    return <div className="text-gray-500">No business found</div>;
  }

  return (
    <div className="flex flex-col gap-2 text-sm text-gray-600 px-1 py-1">
      <h3 className="flex-1 text-xl font-extrabold text-slate-800">
        {business.business_name}
      </h3>
      <div className="flex items-center gap-2 text-sm text-gray-600 px-1 py-1">
        <span className="text-lg">
          {/* <FaMapMarkerAlt /> */}
          📍
        </span>
        <span>
          {business.address}, {business.city} {business.state}
        </span>
      </div>
    </div>
  );
};
export default RewardsIssuedCardContent;
