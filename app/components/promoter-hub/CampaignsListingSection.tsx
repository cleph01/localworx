import ListingsSection from "./promotion-management/CampaignListings";
import FilterHeader from "./promotion-management/FilterHeader";

const CampaignsListingSection = () => {
  return (
    <section className="flex flex-col mt-6 gap-4 px-4">
      <div className="flex flex-col border rounded border-gray-400 px-4 pt-2 space-y-4">
        <h2 className="text-2xl font-bold">My Promotion Campaigns</h2>
        <p className="text-sm">Promotional content created for businesses</p>

        {/* Filter Header */}
        <FilterHeader />
      </div>

      {/* Listings Section */}
      <ListingsSection />
    </section>
  );
};
export default CampaignsListingSection;
