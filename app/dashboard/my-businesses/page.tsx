// show the businesses of the user
// those you are the owner of
// and those you are an admin of

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/lib/authOptions";
import db from "@/db/db";
import Link from "next/link";

export const dynamic = "force-dynamic"; // Ensures SSR for personalized content

export default async function MyBusinessesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <div className="p-8 text-center text-red-600">
        You must be signed in to view this page.
      </div>
    );
  }

  const userId = session.user.id;

  const businesses = await db("businesses")
    .leftJoin("business_users", "businesses.id", "business_users.business_id")
    .select(
      "businesses.id",
      "businesses.name",
      "businesses.city",
      "businesses.state",
      "business_users.role"
    )
    .where("business_users.user_id", userId)
    .whereIn("business_users.role", ["owner", "admin"]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">My Businesses</h1>

      {businesses.length === 0 ? (
        <p className="text-gray-600">You don’t manage any businesses yet.</p>
      ) : (
        <ul className="space-y-4">
          {businesses.map((biz: any) => (
            <li
              key={biz.id}
              className="border border-gray-200 rounded p-4 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{biz.name}</h2>
                  <p className="text-sm text-gray-500">
                    {biz.city}, {biz.state} • Role:{" "}
                    <span className="capitalize font-medium">{biz.role}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/business/${biz.id}`}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    View Profile
                  </Link>
                  <Link
                    href={`/business/${biz.id}/update`}
                    className="px-4 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
