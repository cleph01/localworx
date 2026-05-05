// app/dashboard/page.tsx
"use client";

import UserSummarySection from "../components/dashboard/UserSummarySection/UserSummarySection";
import MyBusinessesSection from "../components/dashboard/MyBusinessesSection/MyBusinessesSection";
import MyPromotionsSection from "../components/dashboard/MyPromotionsSection/MyPromotionsSection";
import MyPostsSection from "../components/dashboard/MyPostsSection/MyPostsSection";
import Footer from "../components/Footer";
import MyEarningsSnapshotSection from "../components/dashboard/MyEarningsSummarySection/MyEarningsSummarySection";
import MyBitcoinWallet from "../components/dashboard/MyBitcoinWallet/MyBitcoinWallet";
import MyRewardsVaultSection from "../components/dashboard/MyRewardsVaultSection/MyRewardsVaultSection";
import { useRequireAuth } from "../hooks/auth/useRequireAuth";

function DashboardSkeleton() {
  return (
    <main className="min-h-screen px-4 pt-8 max-w-6xl mx-auto w-full animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded mb-6" />
      <div className="h-24 w-full bg-gray-200 rounded-lg mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 rounded-lg" />
          ))}
        </div>
        <div className="flex flex-col gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  const { user, isLoading } = useRequireAuth();

  if (isLoading || !user) return <DashboardSkeleton />;

  return (
    <main className="min-h-screen px-4 pt-8 pb-12 max-w-6xl mx-auto w-full">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      {/* Welcome banner */}
      <UserSummarySection />

      {/* Two-column layout: primary content left, sidebar right.
          Sidebar is first in DOM so it appears at the top on mobile. */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        {/* Sidebar — metrics and wallet (first in DOM = top on mobile) */}
        <div className="flex flex-col gap-6 lg:col-start-3 lg:row-start-1">
          <MyEarningsSnapshotSection />
          <MyRewardsVaultSection userId={user.id} />
          <MyBitcoinWallet />
        </div>

        {/* Primary column — action-oriented content */}
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 flex flex-col gap-6">
          <MyBusinessesSection clientSideFetch={true} ownerId={user.id} />
          <MyPromotionsSection clientSideFetch={true} promoterId={user.id} />
          <MyPostsSection clientSideFetch={true} authorId={user.id} />
        </div>

      </div>

      <Footer />
    </main>
  );
}
