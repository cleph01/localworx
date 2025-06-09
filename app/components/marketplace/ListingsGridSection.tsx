// ListingsGridSection.tsx
import Image from "next/image";
import ButtonLink from "../ButtonLink";
import MarketplaceItemCard from "./MarketplaceItemCard/MarketplaceItemCard";
import { Zap } from "nostr-tools/kinds";
import Button from "../ui/Button";
import SearchBarSection from "../ui/SearchBarSection";
import db from "@/db/db";

const ListingsGridSection = async () => {
  const marketplaceListings = await db("marketplace_items")
    .select("*")
    .where({ status: "live" })
    .orderBy("created_at", "desc");

  if (!marketplaceListings || marketplaceListings.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center gap-6 px-4 my-12">
        <h2 className="text-3xl font-bold text-center">
          No Listings Available
        </h2>
        <p className="text-gray-500">Check back later for new listings!</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col justify-center gap-6 px-4 my-12">
      <h2 className="text-3xl font-bold text-center">Current Listings</h2>

      {/* Search Bar */}
      <SearchBarSection />

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketplaceListings.map((item: any) => (
          <MarketplaceItemCard key={item.id} item={item} />
        ))}
      </div>
      {/* Load More Results Button */}
      <Button
        details={{
          text: "Load more results",
          css: "w-full my-6 py-4 bg-navy-blue-background text-white text-base font-bold",
        }}
      />
    </section>
  );
};

export default ListingsGridSection;
