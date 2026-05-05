"use client";
import { useNostrUser } from "@/app/context/NostrUserContext";

export default function LogOutButton() {
  const { signOut } = useNostrUser();

  return (
    <button
      onClick={signOut}
      className="text-xs text-gray-400 hover:text-white border border-white/20 hover:border-white/40 px-3 py-1.5 rounded-lg transition-colors"
    >
      Log out
    </button>
  );
}
