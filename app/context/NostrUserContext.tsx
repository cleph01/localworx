// app/context/NostrUserContext.tsx

"use client";

import { nip19 } from "nostr-tools";
import { hexToBytes } from "@noble/hashes/utils";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type NostrUser = {
  id: string;
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

  // Rehydrate user from localStorage on initial load
  useEffect(() => {
    const userJson = localStorage.getItem("user");

    if (!userJson) {
      setIsLoading(false);
      return;
    }

    try {
      const storedUser = JSON.parse(userJson);
      setUser(storedUser);
    } catch (err) {
      console.error("Failed to parse stored user:", err);
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
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

      const npub = nip19.npubEncode(data.user.pubkey);

      // Fetch Nostr profile
      const profileRes = await fetch(`/api/nostr/profile/${npub}`);
      const profile = await profileRes.json();

      // Check or create internal user
      const userRes = await fetch(`/api/users/by-npub/${npub}`);
      let finalUserData;

      if (userRes.status === 404) {
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
      } else {
        finalUserData = await userRes.json();
      }

      const fullUser = {
        id: finalUserData.id,
        npub,
        name: profile.name,
        picture: profile.picture,
      };

      setUser(fullUser);
      localStorage.setItem("user", JSON.stringify(fullUser));

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
      const res = await fetch("/api/nostr/keys", { method: "POST" });
      const data = await res.json();

      if (!data.pubkey || !data.privkey) {
        toast.error("Failed to generate keys");
        return null;
      }

      const { pubkey, privkey } = data;
      const pubKeyEncoded = nip19.npubEncode(pubkey);
      const privKeyBytes = hexToBytes(privkey);
      const privKeyEncoded = nip19.nsecEncode(privKeyBytes);

      const profileData = {
        name: username,
        about: "Excited to be part of LocalWorx!",
        picture: "",
      };

      await fetch("/api/nostr/profile/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pubkey, privkey, profile: profileData }),
      });

      const newUser = await fetch("/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ npub: pubKeyEncoded, name: username }),
      });

      const newUserData = await newUser.json();

      const fullUser = {
        id: newUserData.id,
        npub: pubKeyEncoded,
        name: profileData.name,
        picture: profileData.picture,
      };

      setUser(fullUser);
      localStorage.setItem("user", JSON.stringify(fullUser));

      toast.success("Account created successfully!");
      return { pubkey: pubKeyEncoded, privkey: privKeyEncoded };
    } catch (err) {
      console.error("Sign up error:", err);
      toast.error("Error creating account. Please try again.");
      return null;
    }
  };

  const signOut = () => {
    localStorage.removeItem("user");
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
