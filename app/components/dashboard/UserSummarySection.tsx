import { useNostrUser } from "@/app/context/NostrUserContext";

const UserSummarySection = () => {
  const { user, isLoading } = useNostrUser();

  if (isLoading) {
    return (
      <div className="w-full h-64 mt-2 rounded-xl border border-gray-200 bg-gray-200 animate-pulse"></div>
    );
  }

  return (
    <section className="sm:min-w-225 bg-white rounded-lg shadow-sm border border-gray-200 p-6 my-6">
      <h2 className="text-2xl font-bold mb-2">👋 Welcome back, {user?.name}</h2>
      <p className="text-sm text-gray-600">
        Here's a snapshot of your impact, earnings, and business growth on
        LocalWorx.
      </p>
    </section>
  );
};
export default UserSummarySection;
