import ListingsSection from "./campaigns/CampaignListings";
import FilterHeader from "./campaigns/FilterHeader";

const CampaignsListingSection = () => {
  return (
    <section className="flex flex-col mt-6 gap-4 px-4">
      <div className="flex flex-col border rounded border-gray-400 p-4 space-y-4">
        <h2 className="text-2xl font-bold">Campaigns</h2>

        {/* Filter Header */}
        <FilterHeader />
      </div>

      {/* Listings Section */}
      <ListingsSection />
    </section>
  );
};
export default CampaignsListingSection;
