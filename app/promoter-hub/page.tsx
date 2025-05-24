// app/promoter-hub/page.tsx

import Footer from "../components/Footer";
import CampaignsListingSection from "../components/promoter-hub/CampaignsListingSection";
import ContentManagementSection from "../components/promoter-hub/ContentManagementSection";
import EarningsSummarySection from "../components/promoter-hub/EarningsSummarySection";
import PaymentSettingsSection from "../components/promoter-hub/PaymentSettingsSection";
import PageHeader from "../components/ui/PageHeader";

const PromoterHubPage = () => {
  return (
    <main className="min-h-screenflex flex-col justify-center">
      {/* Page Header */}
      <PageHeader />

      {/* Earnings Summary Section */}
      <EarningsSummarySection />

      {/* Campaigns Listing Section */}
      <CampaignsListingSection />

      {/* Content Management Section */}
      <ContentManagementSection />

      {/* Payment Settings Section */}
      <PaymentSettingsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default PromoterHubPage;
