// ListingsGridSection.tsx
import Image from "next/image";
import ButtonLink from "../ButtonLink";
import MarketplaceItemCard from "./MarketplaceItemCard";
import { Zap } from "nostr-tools/kinds";
import Button from "../ui/Button";
import SearchBarSection from "../ui/SearchBarSection";

const mockListings = [
  {
    id: "1",
    title: "50% Off Full Service Oil Change",
    mediaUrl:
      "https://plus.unsplash.com/premium_photo-1661753771722-d7529901a504?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    mediaType: "image",
    businessName: "Greenville Auto Service",
    businessRating: "4.5",
    businessRatingCount: "120",
    businessReviewCount: "50",
    businessLocation: "Greenville, SC",
    price: "0.0003",
    category: "Automotive",
    description:
      "Get 50% off a full-service oil change at our Greenville location.",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    zapCount: "100",
    firstName: "John",
  },

  {
    id: "2",
    title: "1 Free Personal Training Session",
    mediaUrl:
      "https://plus.unsplash.com/premium_photo-1661284886010-c58530c86b7b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uYWwlMjB0cmFpbmluZ3xlbnwwfHwwfHx8MA%3D%3D",
    price: "0.0006",
    mediaType: "image",
    businessName: "Asheville Fitness",
    businessRating: "4.8",
    businessRatingCount: "200",
    businessReviewCount: "80",
    businessLocation: "Asheville, NC",
    category: "Fitness",
    description:
      "Enjoy a free personal training session with our certified trainers.",
    avatarUrl:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    zapCount: "150",
    firstName: "Emily",
  },
  {
    id: "3",
    title: "$20 Gift Card - Vegan Bakery",
    mediaUrl:
      "https://images.unsplash.com/photo-1646817120375-ec19300032f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    price: "0.0005",
    mediaType: "image",
    businessName: "Spartanburg Vegan Bakery",
    businessRating: "4.9",
    businessRatingCount: "150",
    businessReviewCount: "60",
    businessLocation: "Spartanburg, SC",
    category: "Food & Beverage",
    description:
      "Redeem this $20 gift card at our vegan bakery in Spartanburg.",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    zapCount: "200",
    firstName: "Sarah",
  },
];

const ListingsGridSection = () => {
  return (
    <section className="flex flex-col justify-center gap-6 px-4 my-12">
      <h2 className="text-3xl font-bold text-center">Current Listings</h2>

      {/* Search Bar */}
      <SearchBarSection />

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockListings.map((listing, idx) => (
          <MarketplaceItemCard key={idx} item={listing} />
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
