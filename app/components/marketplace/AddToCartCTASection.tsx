"use client";
// AddToCartCTASection.tsx

import { toast } from "react-toastify";
import { CartItem } from "@/types/cart/cartType";

import { useFetchRewardById } from "@/app/hooks/reward/useFetchRewardById";

type AddToCartCTASectionProps = {
  id: number | string;
  rewardId: number | string;
  price: number;
};

const AddToCartCTASection = ({
  id,
  rewardId,
  price,
}: AddToCartCTASectionProps) => {
  const { reward, loading, error } = useFetchRewardById(rewardId);
  if (loading) {
    return <div className="text-gray-500">Loading...</div>;
  }
  if (error) {
    console.error("Error fetching reward:", error);
    return <div className="text-red-500">Error fetching reward</div>;
  }
  // If reward is not found, return a message
  if (!reward) {
    return <div className="text-gray-500">Reward not found</div>;
  }

  // Handle Add to Cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    const storedCart: CartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const index = storedCart.findIndex((cartItem) => cartItem.id === id);

    if (index === -1) {
      storedCart.push({
        id,
        name: reward.name,
        price: price, // price is already a number
        quantity: 1,
      });
      toast.success("🎉 Item added to cart!");
    } else {
      storedCart[index].quantity += 1;
      toast.info("🛒 Item already in cart — quantity increased.");
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
  };

  return (
    <section className="w-full max-w-4xl px-4 py-6 bg-blue-50 border-t border-b border-blue-200">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-blue-700">
          <span className="text-orange-500">₿</span> {price.toFixed(2)} BTC
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
