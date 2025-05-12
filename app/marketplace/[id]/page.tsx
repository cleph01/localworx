// app/marketplace/[id]/page.tsx
import { MarketplaceItem } from "../marketplaceTypes";

// Fetch the item details server-side based on the id
export default async function ItemDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params; // Get the item id from the URL

  const res = await fetch(`/api/marketplace/${id}`);
  const item: MarketplaceItem = await res.json();

  if (!item) {
    return <div>Item not found</div>;
  }

  const handleAddToCart = () => {
    // Add item to the cart (use localStorage or context)
    // For simplicity, here we'll just log to the console
    console.log("Added to cart:", item);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{item.title}</h1>
      <div className="flex gap-6">
        <div className="w-1/2">
          <img
            src={item.media_url || "/default.jpg"}
            alt={item.title}
            className="w-full h-auto"
          />
        </div>
        <div className="w-1/2">
          <p className="text-lg mb-4">{item.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">${item.price}</span>
            <button
              onClick={handleAddToCart}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
