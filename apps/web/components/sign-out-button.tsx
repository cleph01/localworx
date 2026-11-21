"use client";
import { useRouter } from "next/navigation";
import { forgetKey } from "@/lib/nostr/signer";

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      className="block w-full rounded-lg px-3 py-2 text-left text-sm text-ink-2 hover:bg-paper-2 hover:text-ink"
      onClick={async () => {
        await fetch("/api/auth/signout", { method: "POST" });
        forgetKey();
        router.push("/");
        router.refresh();
      }}
    >
      Sign out
    </button>
  );
}
