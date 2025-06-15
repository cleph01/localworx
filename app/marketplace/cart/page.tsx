// Marketplace Cart Page
"use client";

import { useEffect, useState } from "react";

import { FaTrash } from "react-icons/fa";

type CartItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const handleRemoveItem = (id: number | string) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleQuantityChange = (id: number | string, delta: number) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="border rounded p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-600">
                  ₿ {item.price} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500"
                  title="Remove"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6 text-lg font-bold">
            Total: ₿{" "}
            {typeof total === "number"
              ? total.toFixed(2)
              : Number(total).toFixed(2)}
          </div>
        </div>
      )}
    </main>
  );
}
