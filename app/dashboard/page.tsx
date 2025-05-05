// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/lib/authOptions";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log("Session in DashboardPage:", session);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  return (
    // <div className="p-8">
    //   <pre>{JSON.stringify(session, null, 2)}</pre>
    // </div>
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard</h1>

        <p className="text-lg text-gray-700 mb-2">
          Welcome,{" "}
          <span className="font-semibold">{session?.user?.name || "user"}</span>
          !
        </p>
        <p className="text-gray-600">Email: {session?.user?.email}</p>
        <p className="text-gray-600 mb-4">User ID: {session?.user?.id}</p>

        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
