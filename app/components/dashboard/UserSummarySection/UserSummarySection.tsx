import { useNostrUser } from "@/app/context/NostrUserContext";

const UserSummarySection = () => {
  const { user, isLoading } = useNostrUser();

  if (isLoading) {
    return (
      <div className="w-full h-64 mt-2 rounded-xl border border-gray-200 bg-gray-200 animate-pulse"></div>
    );
  }

  return (
    <section className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-2 truncate">
        👋 Welcome back, <br />{" "}
        {user?.name ? user?.name : user?.npub.slice(0, 18) + "…"}
      </h2>
      <p className="text-sm text-gray-600">
        Here's a snapshot of your impact, earnings, and business growth on
        LocalWorx.
      </p>
    </section>
  );
};
export default UserSummarySection;
