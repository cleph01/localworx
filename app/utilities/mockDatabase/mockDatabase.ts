// utils/mockDatabase/mockDatabase.ts

export type User = {
  id: string;
  name: string;
  role: "business" | "promoter";
};

export type Business = {
  id: string;
  businessName: string;
  description: string;
  ownerId: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  website: string;
  logoUrl?: string;
  hours?: string;
  phone?: string;
  email?: string;
};

export type Promotion = {
  id: string;
  businessId: string;
  loyaltyRewardId?: string;
  businessName: string;
  promoterId: string;
  title: string;
  description: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  termsAndConditions?: string;
  expiresAt?: string;
};

export type Reward = {
  id: string;
  businessId: string;
  title: string;
  termsAndConditions?: string;
  type: "intro" | "loyalty"; // Use "rewardKind" to distinguish
  threshold?: string;
};

export type Marketplace = {
  id: string;
  title: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  businessName: string;
  businessRating: string;
  businessRatingCount: string;
  businessReviewCount: string;
  businessLocation: string;
  price: string;
  category: string;
  description: string;
  avatarUrl: string;
  zapCount: string;
  firstName: string;
};

// Mutable arrays to simulate a live DB
export const mockUsers: User[] = [
  { id: "u1", name: "Alice Promoter", role: "promoter" },
  { id: "u2", name: "Bob Business", role: "business" },
];

export const mockBusinesses: Business[] = [
  {
    id: "1",
    businessName: "Bob's Barbershop",
    description: "Old-school cuts with a new-school vibe.",
    ownerId: "2",
    address: "123 Main St, Springfield, USA",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    website: "www.bobsbarbershop.com",
    logoUrl:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=350&auto=format&fit=crop",
    hours: "Mon-Fri: 9 AM - 5 PM, Sat: 10 AM - 4 PM",
    phone: "(555) 123-4567",
    email: "bob@bobsbarbershop.com",
  },
];

export const mockPromotions: Promotion[] = [
  {
    id: "1",
    businessId: "1",
    businessName: "Bob's Barbershop",
    promoterId: "1",
    title: "Free Shave With Haircut",
    description: "Come in this weekend and get a free shave.",
    mediaUrl: "https://youtu.be/5CRIEeP4sGk",
    mediaType: "video",
    termsAndConditions: "Valid for new customers only.",
    expiresAt: "2025-09-13",
  },
];

export const mockRewards: Reward[] = [
  {
    id: "1",
    businessId: "1",
    title: "50% Off Next Cut",
    termsAndConditions: "Available after 3 check-ins.",
    type: "loyalty", // Use "rewardType" to distinguish between intro and loyalty
    threshold: "3",
  },
  {
    id: "2",
    businessId: "1",
    title: "Complimentary Hot Towel & Shave",
    // Note: No terms and conditions for intro offer
    type: "intro", // Use "rewardKind" to distinguish
    // No threshold on introOffer
  },
];

export const mockMarketplace: Marketplace[] = [
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
