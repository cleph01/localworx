"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function UpdateBusinessForm({
  business,
}: {
  business: { id: string; name: string; description: string };
}) {
  const router = useRouter();
  const [name, setName] = useState(business.name);
  const [description, setDescription] = useState(business.description);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/business/${business.id}/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    if (res.ok) {
      toast.success("Business updated!");
      router.push(`/business/${business.id}/profile`);
    } else {
      toast.error("Update failed.");
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this business?");
    if (!confirmed) return;

    const res = await fetch(`/api/business/${business.id}/profile`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Business deleted.");
      router.push("/dashboard");
    } else {
      toast.error("Failed to delete business.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Business Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </form>
  );
}
