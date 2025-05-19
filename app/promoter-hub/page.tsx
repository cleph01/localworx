// app/promoter-hub/page.tsx

import CampaignsListingSection from "../components/promoter-hub/CampaignsListingSection";
import ContentManagementSection from "../components/promoter-hub/ContentManagementSection";
import EarningsSummarySection from "../components/promoter-hub/EarningsSummarySection";
import PageHeader from "../components/ui/PageHeader";

const PromoterHubPage = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Page Header */}
      <PageHeader />

      {/* Earnings Summary Section */}
      <EarningsSummarySection />

      {/* Campaigns Listing Section */}
      <CampaignsListingSection />

      {/* Content Management Section */}
      <ContentManagementSection />
    </div>
  );
};

export default PromoterHubPage;
