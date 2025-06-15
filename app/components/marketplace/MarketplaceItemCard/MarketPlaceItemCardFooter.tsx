"use client";

import { CartItem } from "@/types/cart/cartType";
import { useRouter } from "next/navigation";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

type MarketPlaceItemCardFooterProps = {
  id: number | string;
  name: string;
  price: number;
};

const MarketPlaceItemCardFooter = ({
  id,
  name,
  price,
}: MarketPlaceItemCardFooterProps) => {
  const router = useRouter();

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
        name,
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

  // Handle View Item
  const handleViewItem = () => {
    // Use useRouter inside the parent component and pass router as a prop if needed
    router.push(`/marketplace/${id}`);
  };

  return (
    <div className="flex flex-row items-center justify-between gap-4 mt-1">
      {/* Price */}
      <div className="text-blue-600 font-bold text-lg">
        <span className="text-orange-500">₿</span>{" "}
        {typeof price === "number"
          ? price.toFixed(2)
          : Number(price).toFixed(2)}
      </div>

      <div className="flex gap-2">
        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition-colors gap-2"
        >
          <FaShoppingCart /> Add
        </button>

        <button
          onClick={handleViewItem}
          className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors gap-2"
        >
          <FaEye /> View
        </button>
      </div>
    </div>
  );
};

export default MarketPlaceItemCardFooter;
