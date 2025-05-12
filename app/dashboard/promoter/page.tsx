// app/dashboard/promoter/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/lib/authOptions";
import EarningsSummary from "./components/EarningsSummary";
import PromotionsList from "./components/PromotionsList";
import ContentManager from "./components/ContentManager";
import MarketplaceManager from "./components/MarketplaceManager";

export default async function PromoterDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== "promoter") {
    return redirect("/dashboard");
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Promoter Dashboard</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Earnings Summary</h2>
        <EarningsSummary />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Active Promotions</h2>
        <PromotionsList />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Your Content</h2>
        <ContentManager />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Marketplace Items</h2>
        <MarketplaceManager />
      </section>
    </div>
  );
}
