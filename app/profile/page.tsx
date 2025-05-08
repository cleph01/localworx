"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    image?: string;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    })();
  }, []);

  if (!profile) return <p className="p-8">Loading user profile...</p>;

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <p className="text-lg font-semibold">{profile.name}</p>
      <p className="text-gray-700">{profile.email}</p>
      {profile.image && (
        <img
          src={profile.image}
          alt="User Avatar"
          className="mt-4 w-24 h-24 rounded-full"
        />
      )}
      <button
        onClick={() => router.push("/profile/update")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Edit
      </button>
    </div>
  );
}
