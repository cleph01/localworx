"use client";
// app/marketplace/components/MarketplaceItemCard.tsx
import { MarketplaceItem } from "../marketplaceTypes";
import { useRouter } from "next/navigation";

type MarketplaceItemCardProps = {
  item: MarketplaceItem;
};

const MarketplaceItemCard = ({ item }: MarketplaceItemCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/marketplace/${item.id}`);
  };

  const handleAddToCart = () => {
    // Retrieve existing cart from localStorage or initialize as empty array
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if item already exists in cart
    const itemIndex = storedCart.findIndex(
      (cartItem: any) => cartItem.id === item.id
    );

    if (itemIndex === -1) {
      // Item is not already in the cart, add it
      storedCart.push(item);
      localStorage.setItem("cart", JSON.stringify(storedCart));
    } else {
      alert("Item already in the cart");
    }
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      <h3 className="font-bold text-lg">{item.title}</h3>
      <p className="text-sm">{item.category}</p>
      <p className="text-md my-2">{item.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">${item.price}</span>
        <div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Add to Cart
          </button>
          <button
            onClick={handleClick}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceItemCard;
