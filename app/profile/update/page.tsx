"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  // Load initial values into form fields once session is available
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  // Handle profile update form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: session.user.id, name, image }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      toast.success("Profile updated successfully!");
      setTimeout(() => router.push("/profile"), 1500);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile.");
    }
  };

  // Handle account deletion with confirmation
  const handleDelete = async () => {
    if (!session?.user?.id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/user/profile", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: session.user.id }),
      });

      if (!res.ok) throw new Error("Failed to delete profile");

      toast.success("Account deleted. Redirecting to sign out...");
      setTimeout(() => router.push("/api/auth/signout"), 1500);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete account.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      {/* Toast notifications */}
      <ToastContainer position="top-right" />

      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      {/* Profile edit form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Profile Image URL</label>
          <input
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>

      <hr className="my-6" />

      {/* Delete account button */}
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete My Account
      </button>
    </div>
  );
}
