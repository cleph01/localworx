// app/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNostrUser } from "@/app/context/NostrUserContext";
import UserSummarySection from "../components/dashboard/UserSummarySection";
import MyBusinessesSection from "../components/dashboard/MyBusinessesSection";
import MyPromotionsSection from "../components/dashboard/MyPromotionsSection";
import MyPostsSection from "../components/dashboard/MyPostsSection";
import Footer from "../components/Footer";
import MyEarningsSnapshotSection from "../components/dashboard/MyEarningsSummarySection";
import MyBitcoinWallet from "../components/dashboard/MyBitcoinWallet";

import { useRequireAuth } from "../hooks/auth/useRequireAuth";

export default function DashboardPage() {
  // Ensure the user is authenticated before rendering the dashboard
  // This will redirect to /auth if the user is not authenticated
  const { user, isLoading } = useRequireAuth();

  if (isLoading || !user) return <div>...Loading</div>;

  console.log("User in Dashboard: ", user);

  const tempUserId = 1;

  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-8">
      <section className="w-full lg:max-w-4xl flex flex-row justify-start">
        <h1 className="w-full text-3xl font-bold mb-4">My Dashboard</h1>
      </section>
      <UserSummarySection />
      <MyEarningsSnapshotSection />
      {/* <MyBitcoinWallet /> */}
      <MyBusinessesSection clientSideFetch={true} ownerId={tempUserId} />
      <MyPromotionsSection clientSideFetch={true} promoterId={tempUserId} />
      {/* <MyPostsSection /> */}

      <Footer />
    </main>
  );
}
