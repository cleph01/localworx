// app/marketplace/page.tsx
import { MarketplaceItem } from "./marketplaceTypes"; // Define the type for items
import MarketplaceItemCard from "./components/MarketplaceItemCard";
import { getMarketplaceItemsService } from "../api/marketplace/marketplaceService"; // Import the service to fetch items
import PageHeader from "../components/ui/PageHeader";

// Fetch marketplace items server-side (this will be done at request time)
export default async function Marketplace() {
  // Initialize an empty array for items
  let items: MarketplaceItem[] = [];

  try {
    const tempItems = await getMarketplaceItemsService();
    // Fetch the items from the API
    items = tempItems;
  } catch (error) {
    console.error("Error fetching marketplace items:", error);
    return <div>Error loading items</div>; // Handle error gracefully
  }

  return (
    <div className="container mx-auto p-4">
      <PageHeader />
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <MarketplaceItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
