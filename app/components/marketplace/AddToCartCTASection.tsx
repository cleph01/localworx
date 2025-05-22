// AddToCartCTASection.tsx
"use client";
import { useState } from "react";
import { toast } from "react-toastify";

const AddToCartCTASection = ({ item }: { item: any }) => {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex((i: any) => i.id === item.id);

    if (index === -1) {
      cart.push({ ...item, quantity: 1 });
      toast.success("Item added to cart!");
    } else {
      cart[index].quantity += 1;
      toast.info("Quantity updated in cart.");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <section className="w-full max-w-4xl px-4 py-6 bg-blue-50 border-t border-b border-blue-200">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-blue-700">
          <span className="text-orange-500">₿</span> {item.price} BTC
        </span>
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
};

export default AddToCartCTASection;
