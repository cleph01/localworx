"use client";

import Link from "next/link";
import { useNostrUser } from "@/app/context/NostrUserContext";

export default function GuestBanner() {
  const { user, isLoading } = useNostrUser();

  if (isLoading || user) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-navy-blue-background text-white px-4 py-3 flex items-center justify-between gap-4 shadow-lg">
      <p className="text-sm">
        <span className="font-semibold">You're browsing as a guest.</span>{" "}
        Sign in to check in, earn rewards, and support local businesses.
      </p>
      <Link
        href="/auth"
        className="shrink-0 bg-brand-orange hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        Join LocalWorx
      </Link>
    </div>
  );
}
