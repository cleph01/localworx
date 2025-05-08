// app/dashboard/promoter/page.tsx

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/lib/authOptions";

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
        <div className="bg-white shadow p-4 rounded-md">
          {/* TODO: Replace with earnings component */}
          <p>Lifetime: $0.00 | Pending: $0.00 | In-Kind: 0 items</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Active Promotions</h2>
        <div className="bg-white shadow p-4 rounded-md">
          {/* TODO: Replace with promotion list component */}
          <p>No active promotions yet.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Your Content</h2>
        <div className="bg-white shadow p-4 rounded-md">
          {/* TODO: Replace with content list/upload */}
          <p>Upload videos and posts to promote your favorite businesses.</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Marketplace Items</h2>
        <div className="bg-white shadow p-4 rounded-md">
          {/* TODO: Replace with marketplace manager */}
          <p>Manage your in-kind rewards or list them for others to claim.</p>
        </div>
      </section>
    </div>
  );
}
