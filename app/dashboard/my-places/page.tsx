// app/dashboard/my-places/page.tsx
// shows the businesses the user is a member of
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyPlacesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    if (status !== "authenticated") return;

    (async () => {
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const data = await res.json();
        setBusinesses(data.checkedInBusinesses || []);
      }
    })();
  }, [status]);

  if (status === "loading") return <p className="p-8">Loading...</p>;
  if (!session)
    return <p className="p-8">You must be signed in to view this page.</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Places</h1>
      {businesses.length === 0 ? (
        <p>No businesses found from your activity yet.</p>
      ) : (
        <ul className="space-y-4">
          {businesses.map((biz) => (
            <li key={biz.id} className="border p-4 rounded shadow-sm">
              <p className="font-semibold text-lg">{biz.name}</p>
              <p className="text-gray-600 text-sm">
                {biz.address}, {biz.city}, {biz.state}
              </p>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => router.push(`/business/${biz.id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  View Profile
                </button>
                <button
                  onClick={() => router.push(`/business/${biz.id}/checkin`)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Check In
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
