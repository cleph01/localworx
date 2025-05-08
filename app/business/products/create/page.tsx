"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CreateBusinessProductPage() {
  const router = useRouter();
  const [businessId, setBusinessId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  // Fetch the business ID when the component mounts
  useEffect(() => {
    const fetchBusinessProfile = async () => {
      try {
        const res = await fetch("/api/business/profile");
        if (!res.ok) throw new Error("Failed to fetch business profile");
        const data = await res.json();
        setBusinessId(data.id);
      } catch (error) {
        toast.error("Error loading business profile");
      }
    };

    fetchBusinessProfile();
  }, []);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!businessId) {
      toast.error("Missing business ID");
      return;
    }

    try {
      const res = await fetch("/api/business/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          businessId,
        }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Failed to create product");
      }

      toast.success("Product created successfully!");
      router.push("/business/products");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price (USD)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            step="0.01"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
