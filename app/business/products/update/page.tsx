// ✅ app/business/products/update/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function UpdateBusinessProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  // Fetch existing product data on mount
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/business/products/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price?.toString() || "",
        });
      } catch (err) {
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [productId]);

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated product
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/business/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Update failed");
      }

      toast.success("Product updated!");
      router.push("/business/products");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  // Confirm and delete product
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/business/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Delete failed");
      }

      toast.success("Product deleted");
      router.push("/business/products");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Update Product</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
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

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete Product
          </button>
        </div>
      </form>
    </div>
  );
}
