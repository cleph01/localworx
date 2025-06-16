"use client";
// AddToCartCTASection.tsx

import { toast } from "react-toastify";
import { CartItem } from "@/types/cart/cartType";
import useSWR from "swr";

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
  // Client-side fetching of all businessCategories
  // Generic fetcher function
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok)
        throw new Error("Add to cart get reward by Id response was not ok");
      return res.json();
    });

  const searchUrl = `/api/reward/${rewardId}`;

  const { data: reward, error, isLoading } = useSWR(searchUrl, fetcher);

  if (isLoading) {
    return <div className="text-gray-500">Loading reward...</div>;
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
          <span className="text-orange-500">₿</span>{" "}
          {typeof price === "number"
            ? price.toFixed(2)
            : Number(price).toFixed(2)}
          BTC
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
