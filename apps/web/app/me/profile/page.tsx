import type { Metadata } from "next";
import { getCurrentProfile } from "@/lib/auth";
import { Container, PageTitle, SignInPrompt } from "@/components/ui";
import { ProfileForm } from "@/components/profile-form";
import { npubEncode } from "nostr-tools/nip19";

export const metadata: Metadata = { title: "Profile & wallet" };

export default async function ProfilePage() {
  const me = await getCurrentProfile();
  if (!me) return <Container narrow><SignInPrompt next="/me/profile" what="edit your profile" /></Container>;
  return (
    <Container narrow>
      <PageTitle eyebrow="Account" title="Profile & wallet" />
      <ProfileForm profile={me} />
      <div className="card mt-6 p-5">
        <p className="text-sm font-semibold">Your public ID</p>
        <p className="mt-1 font-mono text-xs break-all text-muted">{npubEncode(me.pubkey)}</p>
        <p className="mt-3 text-xs text-muted">
          This is your Nostr identity. It works in any Nostr app. Your private key is only on your devices.
        </p>
      </div>
    </Container>
  );
}
