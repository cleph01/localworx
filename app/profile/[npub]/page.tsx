// app/profile/[npub]/page.tsx

import { notFound } from "next/navigation";
import UserProfileHeader from "../../components/profile/UserProfileHeader";
import LogOutButton from "../../components/ui/LogOutButton";
import Card from "@/app/components/ui/Card";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ npub: string }>;
}) {
  const { npub } = await params;

  let profile;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/nostr/profile/${npub}`
    );

    if (res.ok === false) {
      console.error("Failed to fetch profile:", res.statusText);
      notFound();
    }
    profile = await res.json();

    console.log("Fetched profile @ Profile main page:", profile);
  } catch (err) {
    console.error("Failed to fetch profile", err);
  }

  if (!profile) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <Card
        Header={<UserProfileHeader profile={profile} />}
        Footer={<LogOutButton />}
        css="w-full max-w-sm"
      />

      {/* <UserBusinessList npub={npub} />
      <UserPromotionList npub={npub} /> */}
    </main>
  );
}
