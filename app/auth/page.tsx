"use client";

import { useEffect, useState } from "react";
import SignUpForm from "../components/auth/SignUpForm";
import SignInForm from "../components/auth/SignInForm";
import { useRouter } from "next/navigation";
import PageHeader from "../components/ui/PageHeader";

export default function AuthPage() {
  const [mode, setMode] = useState<"signup" | "signin">("signup");

  const router = useRouter();

  useEffect(() => {
    const pubkey = localStorage.getItem("npub");

    if (pubkey) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <main className="max-w-md mx-auto px-4 pb-8">
      <PageHeader />
      <div className="flex justify-center my-4">
        <button
          onClick={() => setMode("signup")}
          className={`px-4 py-2 font-bold ${
            mode === "signup" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Sign Up
        </button>
        <button
          onClick={() => setMode("signin")}
          className={`px-4 py-2 font-bold ${
            mode === "signin" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Sign In
        </button>
      </div>

      {mode === "signup" ? <SignUpForm /> : <SignInForm />}
    </main>
  );
}
