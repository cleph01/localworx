// app/marketplace/page.tsx
import { MarketplaceItem } from "./marketplaceTypes"; // Define the type for items
import MarketplaceItemCard from "./components/MarketplaceItemCard";

// Fetch marketplace items server-side (this will be done at request time)
export default async function Marketplace() {
  const res = await fetch(`/api/marketplace`);
  const items: MarketplaceItem[] = await res.json(); // Fetch items from the API

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <MarketplaceItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
