"use client";

import { useEffect, useState } from "react";

// app/business/create/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/lib/authOptions";
// import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function CreateBusinessPage() {
  // const session = await getServerSession(authOptions);
  // if (!session?.user) redirect("/api/auth/signin?callbackUrl=/business/create");

  // Nostr keypair (loaded from localStorage)
  const [pubkey, setPubkey] = useState("");
  const [sk, setSk] = useState("");

  async function handleCreate(formData: FormData) {
    // "use server";

    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";

    if (!name) {
      // handle the error internally
      console.error("Business name is required");
      return;
    }

    const res = await fetch("http://localhost:3000/api/business/create", {
      method: "POST",
      body: JSON.stringify({ name, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      // Handle the error internally
      console.error("Failed to create business");
      return;
    }

    // revalidatePath("/business/profile");
    redirect("/business/profile");
  }

  // Load user's Nostr keys from localStorage on first render
  useEffect(() => {
    const storedPubkey = localStorage.getItem("nostr-pubkey");
    const storedSk = localStorage.getItem("nostr-sk");

    if (!storedPubkey || !storedSk) {
      redirect("/nostr/keys/create");
    }

    if (storedPubkey) setPubkey(storedPubkey);
    if (storedSk) setSk(storedSk);
  }, []);

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create Your Business</h1>
      <form action={handleCreate} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-semibold">
            Business Name
          </label>
          <input
            name="name"
            id="name"
            type="text"
            className="w-full border border-gray-300 p-2 rounded mt-1"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Business
        </button>
      </form>
    </div>
  );
}
