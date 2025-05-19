// MarketplaceItemCard.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CartItem, MarketplaceItem } from "./marketplaceTypes";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

type MarketplaceItemCardProps = {
  item: MarketplaceItem;
};

const MarketplaceItemCard = ({ item }: MarketplaceItemCardProps) => {
  const router = useRouter();

  const handleViewItem = () => {
    router.push(`/marketplace/${item.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    const storedCart: CartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const index = storedCart.findIndex((cartItem) => cartItem.id === item.id);

    if (index === -1) {
      storedCart.push({
        id: item.id,
        name: item.title, // Map 'title' to 'name'
        price: parseFloat(item.price), // Ensure price is a number
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
    <div
      onClick={handleViewItem}
      className="rounded shadow border p-4 bg-white flex flex-col hover:shadow-lg cursor-pointer transition-all duration-200"
    >
      <img
        src={item.image}
        alt={item.title}
        width={300}
        height={200}
        className="rounded mb-4 object-cover"
      />

      <h3 className="font-bold text-xl mb-1">{item.title}</h3>
      <p className="text-sm text-gray-500 mb-2">{item.category}</p>
      <p className="text-gray-700 text-base mb-4">{item.description}</p>

      <div className="flex justify-between items-center mt-auto">
        <span className="text-blue-600 font-bold text-lg">₿ {item.price}</span>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-blue-700"
          >
            <FaShoppingCart /> Add
          </button>
          <button
            onClick={handleViewItem}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-gray-300"
          >
            <FaEye /> View
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceItemCard;
