// hooks/useRequireAuth.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useNostrUser } from "../context/NostrUserContext";

/**
 * A hook to enforce authenticated access to a page.
 * Redirects to /auth if not authenticated.
 * Returns the user and isLoading state.
 */
export function useRequireAuth() {
  const { user, isLoading } = useNostrUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user === null) {
      toast.error("You must be signed in to access this page.");
      router.push("/auth");
    }
  }, [isLoading, user, router]);

  return { user, isLoading };
}
