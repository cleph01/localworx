"use client";
import { useRouter } from "next/navigation";
import { useNostrUser } from "@/app/context/NostrUserContext";
import { toast } from "react-toastify";

export default function LogOutButton() {
  const router = useRouter();
  const { user, signOut } = useNostrUser();

  return (
    <button
      onClick={signOut}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow"
    >
      {user ? "Log Out" : "...Logging Out"}
    </button>
  );
}
