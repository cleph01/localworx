// app/checkin/[id]/page.tsx

import BusinessInfoSection from "../../components/checkin/BusinessInfoSection";
import LoyaltyProgressSection from "../../components/checkin/LoyaltyProgressSection";
import IntroOfferSection from "../../components/checkin/IntroOfferSection";
import CheckinHistorySection from "../../components/checkin/CheckinHistorySection";
import LocationCheckinSection from "../../components/checkin/LocationCheckinSection";
import Footer from "../../components/Footer";

export default async function BusinessCheckinPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Extract the id from the context
  // Note: params is a Promise, so we need to await it
  const { id } = await params; // Get the item id from the URL

  // 🔧 Fetch business details (replace with your real API call)

  if (!id) {
    return <div>Business not found</div>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-8">
      {/* Business Info Header */}
      <BusinessInfoSection businessId={id} />

      {/* Submit Location & Check In */}
      <LocationCheckinSection businessId={id} />

      {/* Loyalty Program Progress */}
      <LoyaltyProgressSection businessId={id} userId="3" />

      {/* Previous Check-In History */}
      <CheckinHistorySection businessId={id} />

      <Footer />
    </main>
  );
}
