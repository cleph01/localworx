import type { Metadata } from "next";
import { SignInPanel } from "@/components/signin-panel";

export const metadata: Metadata = { title: "Sign in" };

export default async function SignInPage({ searchParams }: PageProps<"/signin">) {
  const { next } = await searchParams;
  const safeNext = typeof next === "string" && next.startsWith("/") && !next.startsWith("//") ? next : "/me";
  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:py-20">
      <p className="eyebrow">Welcome</p>
      <h1 className="h-display mt-2 text-4xl">Sign in to LocalWorx</h1>
      <p className="mt-3 text-muted">
        No email, no password. Your account is a key that stays on your device, so no one,
        including us, can lock you out or sell your data.
      </p>
      <SignInPanel next={safeNext} />
    </div>
  );
}
