// app/promoter-hub/page.tsx

import EarningsSummarySection from "../components/promoter-hub/earnings-summary/EarningsSummarySection";
import PageHeader from "../components/ui/PageHeader";

const PromoterHubPage = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Page Header */}
      <PageHeader />

      {/* Earnings Summary Section */}
      <EarningsSummarySection />
      <div>Test promoter hub page</div>
    </div>
  );
};

export default PromoterHubPage;
