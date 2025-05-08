// ✅ app/business/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

type Business = {
  name: string;
};

export default function BusinessProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [business, setBusiness] = useState<Business | null>(null);

  // Fetch business info and products on mount
  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const businessRes = await fetch("/api/business/profile");
        const businessData = await businessRes.json();
        setBusiness(businessData);

        const productsRes = await fetch(
          `/api/business/products?businessId=${businessData.id}`
        );
        const productsData = await productsRes.json();
        setProducts(productsData);
      } catch (err) {
        console.error("Failed to load products or business profile", err);
      }
    };

    fetchBusinessData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">My Products</h1>
        {business && (
          <p className="text-gray-600">
            Business: <strong>{business.name}</strong>
          </p>
        )}
      </div>

      <button
        onClick={() => router.push("/business/products/create")}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add New Product
      </button>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-gray-800 font-medium mt-2">
                Price: ${product.price.toFixed(2)}
              </p>
              <button
                onClick={() =>
                  router.push(`/business/products/update?id=${product.id}`)
                }
                className="mt-3 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
