// CartIcon.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const CartIcon = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalItems = stored.reduce(
        (sum: number, item: any) => sum + (item.quantity || 1),
        0
      );
      setCount(totalItems);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount); // For external changes

    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <Link href="/marketplace/cart" className="relative">
      <FaShoppingCart className="w-6 h-6 text-white" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
