// app/profile/me/page.tsx

"use client";

import { useNostrUser } from "../../context/NostrUserContext";
import UserProfileHeader from "../../components/profile/UserProfileHeader";
import LogOutButton from "../../components/ui/LogOutButton";
import Card from "../../components/ui/Card";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";

export default function MyProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  // Ensure the user is authenticated before rendering the dashboard
  // This will redirect to /auth if the user is not authenticated
  const { user, isLoading } = useRequireAuth();

  if (isLoading || !user) return <div>...Loading</div>;

  useEffect(() => {
    if (!user?.npub) return;

    async function loadProfile() {
      try {
        const res = await fetch(`/api/nostr/profile/${user?.npub}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        setProfile(null);
        // Optionally log error or show a message
        console.error("Error loading profile:", error);
      }
    }

    loadProfile();
  }, [user?.npub]);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <Card
        Header={<UserProfileHeader profile={profile} />}
        Footer={<LogOutButton />}
        css="w-full max-w-sm"
      />
    </main>
  );
}
