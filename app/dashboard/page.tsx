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
import { toast } from "react-toastify";

export default function DashboardPage() {
  // gets user state from context
  const { user, isLoading } = useNostrUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user === null) {
      toast.error("You must be signed in to access the dashboard.");
      router.push("/auth");
    }
  }, [isLoading, user]);

  if (isLoading || !user) return <div>...Loading</div>;
  if (!user) return null; // this line will be skipped if redirect has already been triggered

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8">
      <section className="w-full lg:max-w-4xl flex flex-row justify-start">
        <h1 className="w-full text-3xl font-bold mb-4">My Dashboard</h1>
      </section>
      <UserSummarySection />
      <MyEarningsSnapshotSection />
      {/* <MyBitcoinWallet /> */}
      <MyBusinessesSection />
      {/* <MyPromotionsSection /> */}
      <MyPostsSection />

      <Footer />
    </main>
  );
}
