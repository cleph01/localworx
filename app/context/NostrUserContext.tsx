// app/context/NostrUserContext.tsx
"use client";

import { nip19 } from "nostr-tools";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type NostrUser = {
  id: string; // Internal user ID in your database
  npub: string;
  name?: string;
  picture?: string;
};

type NostrUserContextType = {
  user: NostrUser | null;
  setUser: (user: NostrUser | null) => void;
  signIn: (nsec: string) => Promise<boolean>;
  signUp: (
    username: string
  ) => Promise<{ pubkey: string; privkey: string } | null>;
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

      if (!data?.user?.pubkey) {
        toast.error(data.error || "Invalid credentials");
        return false;
      }

      // Encode pubkey using NIP-19 (comes as hex)
      const npub = nip19.npubEncode(data.user.pubkey);
      localStorage.setItem("npub", npub);

      // Fetch Nostr profile
      const profileRes = await fetch(`/api/nostr/profile/${npub}`);
      const profile = await profileRes.json();

      console.log("Fetched Nostr profile @ NostrUserContext:", profile);

      // Check if user exists in our internal DB
      const userRes = await fetch(`/api/users/by-npub/${npub}`);

      let finalUserData;

      if (userRes.status === 404) {
        // User doesn't exist — create them
        const newUser = await fetch("/api/users/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            npub,
            name: profile.name,
            picture: profile.picture,
          }),
        });
        finalUserData = await newUser.json();
        console.log("Created new user in DB:", finalUserData);
      } else {
        // User exists — use existing data
        finalUserData = await userRes.json();
        console.log("Existing user found in DB:", finalUserData);
      }

      // ✅ Store user in context
      setUser({
        id: finalUserData.id,
        npub,
        name: profile.name,
        picture: profile.picture,
      });

      toast.success("Signed in successfully!");
      return true;
    } catch (err) {
      console.error("Sign in error:", err);
      toast.error("Sign in failed. Please try again.");
      return false;
    }
  };

  const signUp = async (
    username: string
  ): Promise<{ pubkey: string; privkey: string } | null> => {
    try {
      // 1. Generate keypair
      const res = await fetch("/api/nostr/keys", { method: "POST" });
      const data = await res.json();

      if (!data.pubkey || !data.privkey) {
        toast.error("Failed to generate keys");
        return null;
      }

      const { pubkey, privkey } = data;

      // Encode keys using NIP-19
      const pubKeyEncoded = nip19.npubEncode(pubkey);
      const privKeyBytes = hexToBytes(privkey);
      const privKeyEncoded = nip19.nsecEncode(privKeyBytes);

      // 2. Publish kind:0 profile event (default)
      const profileData = {
        name: username,
        about: "Excited to be part of LocalWorx!",
        picture: "", // Optional: provide a default avatar later
      };

      await fetch("/api/nostr/profile/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pubkey, privkey, profile: profileData }),
      });

      // 3. Save user in our internal DB
      const newUser = await fetch("/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ npub: pubKeyEncoded, name: username }),
      });

      // 4. Save to localStorage + update context
      localStorage.setItem("npub", pubKeyEncoded);

      const newUserData = await newUser.json();
      console.log("Created new user in DB:", newUserData);
      setUser({
        id: newUserData.id, // Assuming the response contains the new user's ID
        npub: pubKeyEncoded,
        name: profileData.name,
        picture: profileData.picture,
      });

      toast.success("Account created successfully!");
      return { pubkey: pubKeyEncoded, privkey: privKeyEncoded };
    } catch (err) {
      console.error("Sign up error:", err);
      toast.error("Error creating account. Please try again.");
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
