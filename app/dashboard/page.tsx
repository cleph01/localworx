// app/dashboard/page.tsx

import UserSummarySection from "../components/dashboard/UserSummarySection";
import MyBusinessesSection from "../components/dashboard/MyBusinessesSection";
import MyPromotionsSection from "../components/dashboard/MyPromotionsSection";
import MyPostsSection from "../components/dashboard/MyPostsSection";
import Footer from "../components/Footer";
import MyEarningsSnapshotSection from "../components/dashboard/MyEarningsSummarySection";
import MyBitcoinWallet from "../components/dashboard/MyBitcoinWallet";

export default async function DashboardPage() {
  // const session = await getServerSession(authOptions);
  // console.log("Session in DashboardPage:", session);
  // Checks if User is signed in
  // if (!session) {
  //   redirect("/api/auth/signin?callbackUrl=/dashboard");
  // }

  return (
    // <div className="p-8">
    //   <pre>{JSON.stringify(session, null, 2)}</pre>
    // </div>
    <main className="min-h-screen flex flex-col items-center px-4 py-8">
      <section className="w-full lg:max-w-4xl flex flex-row justify-start">
        <h1 className="w-full text-3xl font-bold mb-4">My Dashboard</h1>
      </section>
      <UserSummarySection />
      <MyEarningsSnapshotSection />
      <MyBitcoinWallet />
      <MyBusinessesSection />
      <MyPromotionsSection />
      <MyPostsSection />

      <Footer />
    </main>
  );
}
