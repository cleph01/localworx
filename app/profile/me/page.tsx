"use client";

import { useEffect, useState } from "react";
import { useRequireAuth } from "@/app/hooks/auth/useRequireAuth";
import UserProfileHeader from "../../components/profile/UserProfileHeader";
import LogOutButton from "../../components/ui/LogOutButton";
import Card from "../../components/ui/Card";

export default function MyProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const { user, isLoading } = useRequireAuth();

  // useEffect must be at the top level — before any conditional returns
  useEffect(() => {
    if (!user?.npub) return;

    async function loadProfile() {
      try {
        const res = await fetch(`/api/nostr/profile/${user?.npub}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        setProfile(await res.json());
      } catch (err) {
        console.error("Error loading profile:", err);
        setProfile(null);
      }
    }

    loadProfile();
  }, [user?.npub]);

  if (isLoading || !user) return <div className="p-6 animate-pulse">Loading profile...</div>;

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
