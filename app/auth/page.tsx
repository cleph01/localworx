"use client";

import { useEffect, useState } from "react";
import SignUpForm from "../components/auth/SignUpForm";
import SignInForm from "../components/auth/SignInForm";
import { useRouter } from "next/navigation";
import { useNostrUser } from "../context/NostrUserContext";

export default function AuthPage() {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [extensionLoading, setExtensionLoading] = useState(false);

  const router = useRouter();
  const { signInWithExtension } = useNostrUser();

  useEffect(() => {
    const pubkey = localStorage.getItem("npub");
    if (pubkey) router.push("/dashboard");
  }, []);

  const handleExtensionLogin = async () => {
    setExtensionLoading(true);
    const success = await signInWithExtension();
    if (success) router.push("/dashboard");
    setExtensionLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="font-serif italic text-brand-orange">Unlock</span> Your Local Power
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Decentralized identity via Nostr. No email, no password.
          </p>
        </div>

        {/* NIP-07 Extension Login */}
        <button
          onClick={handleExtensionLogin}
          disabled={extensionLoading}
          className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm mb-2"
        >
          {extensionLoading ? "Connecting…" : "⚡ Login with Nostr Extension"}
        </button>
        <p className="text-center text-xs text-gray-400 mb-6">
          Works with Alby, nos2x, and other NIP-07 extensions
        </p>

        <div className="flex items-center gap-3 mb-6">
          <hr className="flex-1 border-gray-200" />
          <span className="text-xs text-gray-400">or use your key</span>
          <hr className="flex-1 border-gray-200" />
        </div>

        {/* Mode tabs */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-6">
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 text-sm font-semibold transition-colors ${
              mode === "signup"
                ? "bg-navy-blue-background text-white"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setMode("signin")}
            className={`flex-1 py-2 text-sm font-semibold transition-colors ${
              mode === "signin"
                ? "bg-navy-blue-background text-white"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            Sign In
          </button>
        </div>

        {mode === "signup" ? <SignUpForm /> : <SignInForm />}
      </div>
    </main>
  );
}
