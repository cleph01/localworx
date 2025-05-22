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
