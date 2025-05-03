"use client";

import { useSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { data: session, status } = useSession();

  // Note: Make sure to add the necessary CSS for the loading spinner in your global CSS file or use a library like Tailwind CSS for styling.
  // You can customize the loading spinner and the dashboard UI as per your design requirements.
  if (status === "loading") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="animate-spin border-4 border-t-4 border-blue-500 rounded-full w-24 h-24"></div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    toast.success("Successfully signed out!");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {session?.user?.name || "user"}!</p>
      <p>Email: {session?.user?.email}</p>
      <button
        onClick={handleSignOut}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Sign out
      </button>
    </div>
  );
}
