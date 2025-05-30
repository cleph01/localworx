// app/context/NostrUserContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type NostrUser = {
  npub: string;
  name?: string;
  picture?: string;
};

type NostrUserContextType = {
  user: NostrUser | null;
  setUser: (user: NostrUser | null) => void;
  signIn: (nsec: string) => Promise<boolean>;
  signUp: () => Promise<{ pubkey: string; privkey: string } | null>;
  signOut: () => void;
  isLoading: boolean;
};

const NostrUserContext = createContext<NostrUserContextType | undefined>(
  undefined
);

export function NostrUserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<NostrUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-load user profile from localStorage
  useEffect(() => {
    const npub = localStorage.getItem("npub");
    if (!npub) {
      setIsLoading(false);
      return;
    }

    async function fetchProfile() {
      try {
        const res = await fetch(`/api/nostr/profile/${npub}`);
        if (!res.ok) throw new Error("Profile fetch failed");

        const profile = await res.json();
        setUser({ npub, ...profile });
      } catch (err) {
        console.error("Failed to fetch Nostr profile", err);
        // 🚨 Clear broken session
        localStorage.removeItem("npub");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const signIn = async (nsec: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/nostr/auth", {
        method: "POST",
        body: JSON.stringify({ nsec }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data?.user?.pubkey) {
        localStorage.setItem("npub", data.user.pubkey);

        // 🧠 Immediately fetch and store the profile
        const profileRes = await fetch(
          `/api/nostr/profile/${data.user.pubkey}`
        );
        const profile = await profileRes.json();

        setUser({
          npub: data.user.pubkey,
          name: profile.name,
          picture: profile.picture,
        });

        toast.success("Signed in successfully!");
        return true;
      } else {
        toast.error(data.error || "Invalid credentials");
        return false;
      }
    } catch (err) {
      console.error("Sign in error:", err);
      toast.error("Sign in failed. Please try again.");
      return false;
    }
  };

  const signUp = async (): Promise<{
    pubkey: string;
    privkey: string;
  } | null> => {
    try {
      const res = await fetch("/api/nostr/keys", { method: "POST" });
      const data = await res.json();

      if (data.pubkey && data.privkey) {
        localStorage.setItem("npub", data.pubkey);

        // Fetch and hydrate profile
        const profileRes = await fetch(`/api/nostr/profile/${data.pubkey}`);
        const profile = await profileRes.json();

        setUser({
          npub: data.pubkey,
          name: profile.name,
          picture: profile.picture,
        });

        toast.success("Account created successfully!");
        return data;
      } else {
        toast.error("Failed to generate keys");
        return null;
      }
    } catch (err) {
      console.error("Sign up error:", err);
      toast.error("Error generating keys");
      return null;
    }
  };

  const signOut = () => {
    localStorage.removeItem("npub");
    setUser(null);
    toast("Signed out successfully.");
  };

  return (
    <NostrUserContext.Provider
      value={{ user, setUser, signIn, signUp, signOut, isLoading }}
    >
      {children}
    </NostrUserContext.Provider>
  );
}

export function useNostrUser() {
  const context = useContext(NostrUserContext);
  if (!context) {
    throw new Error("useNostrUser must be used within a NostrUserProvider");
  }
  return context;
}
