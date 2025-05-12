// app/shopping-cart/page.tsx
"use client";

import { useState, useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const handleRemoveItem = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    // Redirect to checkout page
    window.location.href = "/checkout";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between p-4 border-b">
                <span>{item.title}</span>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <span>
              Total: ${cart.reduce((acc, item) => acc + item.price, 0)}
            </span>
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white px-6 py-2 rounded"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
