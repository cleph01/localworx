// utils/mockDatabase/mockDatabase.ts

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  role: "business" | "promoter" | "user";
  avatarUrl: string;
};

export type Business = {
  id: string;
  businessName: string;
  firstName: string;
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
  rating?: number;
  reviewCount?: number;

  avatarUrl?: string;
  introOffer?: string;
  categories?: string[];
  zapCount?: number;
  hiringPromoters?: boolean;
  hasSpecialOffers?: boolean;
};

export type Promotion = {
  id: string;
  businessId?: string;
  businessName: string;
  promoterId?: string;
  title: string;
  description: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  termsAndConditions?: string;
  expiresAt?: string;
  firstName?: string;
  rating?: string;
  reviewCount?: string;
  clicks?: string;
  views?: string;
  referrals?: string;
  avatarUrl?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
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

export type Post = {
  id: string;
  userId: string;
  firstName: string;
  title: string;
  description: string;
  likes: string;
  comments: string;
  publishDate: string;
  avatarUrl: string;
  mediaUrl: string;
  mediaType: string;
  zapCount: string;
};

// Mutable arrays to simulate a live DB
export const mockUsers: User[] = [
  {
    id: "1",
    firstName: "Dennis",
    lastName: "Promoter",
    role: "promoter",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Business",
    role: "business",
    avatarUrl:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "3",
    firstName: "Charlie",
    lastName: "Burpee",
    role: "user",
    avatarUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "4",
    firstName: "Diana",
    lastName: "Promoter",
    role: "promoter",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    id: "5",
    firstName: "Ethan",
    lastName: "Business",
    role: "business",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    id: "6",
    firstName: "Fiona",
    lastName: "User",
    role: "user",
    avatarUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "7",
    firstName: "George",
    lastName: "Promoter",
    role: "promoter",
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
];

export const mockBusinesses: Business[] = [
  {
    id: "1",
    businessName: "Bob's Barbershop",
    firstName: "Bob",
    rating: 4.5,
    reviewCount: 10,
    description: "Old-school cuts with a new-school vibe.",
    ownerId: "2",
    address: "123 Main St",
    city: "Springfield",
    state: "IL",
    zip: "62701",

    website: "www.bobsbarbershop.com",
    logoUrl:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=350&auto=format&fit=crop",
    hours: "Mon-Fri: 9 AM - 5 PM, Sat: 10 AM - 4 PM",
    phone: "(555) 123-4567",
    email: "bob@bobsbarbershop.com",
    introOffer: "10% off your first service",
    categories: ["Category1", "Category2"],
    zapCount: 100,
    hiringPromoters: true,
    hasSpecialOffers: false,
  },
  {
    id: "2",
    businessName: "John's Plumbing Services",
    firstName: "John",
    description:
      "Expert plumbing services for residential and commercial needs.",
    ownerId: "3",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    website: "www.johnsplumbing.com",
    rating: 4.5,
    reviewCount: 10,
    logoUrl:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    hours: "9 AM - 5 PM",
    address: "123 Main St",
    hiringPromoters: true,
    hasSpecialOffers: false,
    introOffer: "10% off your first service",
    categories: ["Category1", "Category2"],
    zapCount: 100,
    email: "john@johnsplumbing.com",
    phone: "555-555-5555",
  },
  {
    id: "3",
    businessName: "Tech Solutions Inc.",
    firstName: "Jane",
    description: "Innovative tech solutions for modern businesses.",
    ownerId: "4",
    city: "Springfield",
    state: "IL",
    zip: "62702",
    website: "www.techsolutions.com",
    rating: 4.0,
    reviewCount: 20,
    logoUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    hours: "10 AM - 6 PM",
    address: "456 Elm St",
    hiringPromoters: false,
    hasSpecialOffers: true,
    introOffer: "Free consultation",
    categories: ["Category3", "Category4"],
    zapCount: 200,
    email: "info@techsolutions.com",
    phone: "555-555-5555",
  },
  {
    id: "4",
    businessName: "Green Thumb Landscaping",
    firstName: "Alice",
    description: "Professional landscaping and gardening services.",
    ownerId: "5",
    city: "Springfield",
    state: "IL",
    zip: "62703",
    website: "www.greenthumblandscaping.com",
    rating: 5.0,
    reviewCount: 30,
    logoUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    hours: "8 AM - 4 PM",
    address: "789 Oak St",
    hiringPromoters: true,
    hasSpecialOffers: false,
    introOffer: "20% off for referrals",
    categories: ["Category5", "Category6"],
    zapCount: 300,
    email: "info@greenthumb.com",
    phone: "555-555-5555",
  },
  {
    id: "5",
    businessName: "Bob's Auto Repair",
    firstName: "Bob",
    description: "Reliable auto repair services for all makes and models.",
    ownerId: "6",
    city: "Springfield",
    state: "IL",
    zip: "62704",
    website: "www.bobsautorepair.com",
    rating: 3.5,
    reviewCount: 5,
    logoUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    hours: "11 AM - 7 PM",
    address: "101 Pine St",
    hiringPromoters: false,
    hasSpecialOffers: true,
    introOffer: "Buy one get one free",
    categories: ["Category7", "Category8"],
    zapCount: 50,
    email: "bob@bobsautorepair.com",
    phone: "555-555-5555",
  },
  {
    id: "6",
    businessName: "Charlie’s Bakery",
    firstName: "Charlie",
    description: "Delicious baked goods made fresh daily.",
    ownerId: "7",
    city: "Springfield",
    state: "IL",
    zip: "62705",
    website: "www.charliesbakery.com",
    rating: 4.8,
    reviewCount: 15,
    logoUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    hours: "7 AM - 3 PM",
    address: "202 Maple St",
    hiringPromoters: true,
    hasSpecialOffers: false,
    introOffer: "Free shipping on orders over $50",
    categories: ["Category9", "Category10"],
    zapCount: 150,
    email: "charlie@charliesbakery.com",
    phone: "555-555-5555",
  },
  {
    id: "7",
    businessName: "Dave's Fitness Center",
    firstName: "Dave",
    description: "State-of-the-art fitness center with personal training.",
    ownerId: "8",
    city: "Springfield",
    state: "IL",
    zip: "62706",
    website: "www.davesfitness.com",
    rating: 4.2,
    reviewCount: 25,
    logoUrl:
      "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    hours: "12 PM - 8 PM",
    address: "303 Birch St",
    hiringPromoters: false,
    hasSpecialOffers: true,
    introOffer: "10% off for new customers",
    categories: ["Category11", "Category12"],
    zapCount: 400,
    email: "dave@davesfitness.com",
    phone: "555-555-5555",
  },
  {
    id: "8",
    businessName: "Dave's Digital Marketing",
    firstName: "Dave",
    description:
      "Specializing in SEO, PPC, and social media marketing for local businesses.",
    ownerId: "9",
    city: "Springfield",
    state: "IL",
    zip: "62707",
    website: "www.davesdigitalmarketing.com",
    rating: 4.2,
    reviewCount: 25,

    hours: "9 AM - 6 PM",
    address: "404 Digital Ave",
    hiringPromoters: true,
    hasSpecialOffers: true,
    introOffer: "Free SEO audit for new clients",
    categories: ["Marketing", "Digital Services"],
    zapCount: 250,
    logoUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",

    phone: "(555) 789-0123",
    email: "dave@davesdigitalmarketing.com",
  },
  {
    id: "9",
    businessName: "Charlie & Co. Consulting",
    firstName: "Charlie",
    description:
      "Expert consulting services for small businesses and startups.",
    ownerId: "3",
    address: "654 Cedar Blvd",
    city: "Brookfield",
    state: "NY",
    zip: "10001",
    website: "www.charlieco.com",
    logoUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    hours: "Mon-Fri: 9 AM - 5 PM",
    phone: "(555) 567-8901",
    email: "charlie@charlieco.com",
    rating: 4.8,
    reviewCount: 15,

    introOffer: "Startup Package: Free Strategy Session",
    categories: ["Consulting", "Business Services"],
    zapCount: 180,
    hiringPromoters: false,
    hasSpecialOffers: true,
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

    rating: "4.7",
    reviewCount: "12",
    clicks: "80",
    views: "150",
    referrals: "30",

    address: "123 Main St, Springfield, USA",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    phone: "(555) 123-4567",
  },

  {
    id: "2",
    businessId: "2",
    promoterId: "1",
    title: "20% Off Your First Campaign!",
    businessName: "BrightPath Marketing",
    description:
      "We help local businesses grow through targeted marketing strategies.",

    rating: "4.5",
    reviewCount: "10",
    clicks: "100",
    views: "200",
    referrals: "50",

    mediaUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
    address: "123 Main St",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    phone: "555-123-4567",
    expiresAt: "2025-12-22",
  },
  {
    id: "3",
    businessId: "3",
    promoterId: "1",
    title: "Free Consultation for New Clients!",
    businessName: "Tech Innovations",
    description: "Leading the way in tech solutions for small businesses.",

    rating: "4.0",
    reviewCount: "20",
    clicks: "150",
    views: "300",
    referrals: "70",

    mediaUrl: "https://vimeo.com/153173314?&login=true",
    mediaType: "video",
    address: "456 Oak Ave",
    city: "Riverton",
    state: "CA",
    zip: "90210",
    phone: "555-234-5678",
    expiresAt: "2025-12-22",
  },
  {
    id: "4",
    businessId: "4",
    promoterId: "4",
    title: "Spring Special: Free Garden Assessment",
    businessName: "Green Thumb Landscaping",
    description: "Transforming outdoor spaces into beautiful landscapes.",

    rating: "5.0",
    reviewCount: "30",
    clicks: "200",
    views: "400",
    referrals: "100",

    mediaUrl: "https://youtu.be/ilE0T2H5pF4",
    mediaType: "video",
    address: "789 Elm St",
    city: "Mapleton",
    state: "TX",
    zip: "75001",
    phone: "555-345-6789",
    expiresAt: "2025-12-22",
  },
  {
    id: "5",
    businessId: "5",
    promoterId: "4",
    title: "10% Off All Repairs This Month!",
    businessName: "Bob's Auto Repair",
    description: "Your trusted local auto repair shop.",

    rating: "3.5",
    reviewCount: "5",
    clicks: "50",
    views: "100",
    referrals: "20",

    mediaUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
    address: "321 Pine Rd",
    city: "Lakeside",
    state: "FL",
    zip: "32065",
    phone: "555-456-7890",
    expiresAt: "2025-12-22",
  },
  {
    id: "6",
    businessId: "9",
    promoterId: "4",
    title: "Startup Package: Free Strategy Session",
    businessName: "Charlie & Co. Consulting",
    description:
      "Expert consulting services for small businesses and startups.",

    rating: "4.8",
    reviewCount: "15",
    clicks: "80",
    views: "160",
    referrals: "40",

    mediaUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
    address: "654 Cedar Blvd",
    city: "Brookfield",
    state: "NY",
    zip: "10001",
    phone: "555-567-8901",
    expiresAt: "2025-12-22",
  },
  {
    id: "7",
    businessId: "8",
    promoterId: "7",
    title: "Limited Time: Free SEO Audit",
    businessName: "Dave's Digital Marketing",
    description:
      "Specializing in SEO, PPC, and social media marketing for local businesses.",

    rating: "4.2",
    reviewCount: "25",
    clicks: "120",
    views: "240",
    referrals: "60",

    mediaUrl: "https://youtu.be/hr2Im6lLJhA",
    mediaType: "video",
    address: "987 Maple Ln",
    city: "Fairview",
    state: "OH",
    zip: "44126",
    phone: "555-678-9012",
    expiresAt: "2025-12-22",
  },
];

export const mockRewards: Reward[] = [
  {
    id: "1",
    businessId: "1",
    title: "50% Off Next Cut",
    termsAndConditions: "Available after 3 check-ins.",
    type: "loyalty",
    threshold: "3",
  },
  {
    id: "2",
    businessId: "1",
    title: "Complimentary Hot Towel & Shave",
    type: "intro",
  },
  {
    id: "3",
    businessId: "2",
    title: "10% Off First Plumbing Service",
    type: "intro",
    termsAndConditions: "Valid for new customers only.",
  },
  {
    id: "4",
    businessId: "2",
    title: "Free Drain Inspection",
    type: "loyalty",
    termsAndConditions: "After 2 paid services.",
    threshold: "2",
  },
  {
    id: "5",
    businessId: "3",
    title: "Free Consultation",
    type: "intro",
    termsAndConditions: "One per business.",
  },
  {
    id: "6",
    businessId: "3",
    title: "20% Off Annual Support Plan",
    type: "loyalty",
    termsAndConditions: "After 1 completed project.",
    threshold: "1",
  },
  {
    id: "7",
    businessId: "4",
    title: "20% Off for Referrals",
    type: "intro",
    termsAndConditions: "Valid for new clients only.",
  },
  {
    id: "8",
    businessId: "4",
    title: "Free Seasonal Planting Guide",
    type: "loyalty",
    termsAndConditions: "After 2 completed services.",
    threshold: "2",
  },
  {
    id: "9",
    businessId: "5",
    title: "Buy One Get One Free",
    type: "intro",
    termsAndConditions: "On select services.",
  },
  {
    id: "10",
    businessId: "5",
    title: "Free Tire Rotation",
    type: "loyalty",
    termsAndConditions: "After 3 oil changes.",
    threshold: "3",
  },
  {
    id: "11",
    businessId: "6",
    title: "Free Shipping on Orders Over $50",
    type: "intro",
    termsAndConditions: "Online orders only.",
  },
  {
    id: "12",
    businessId: "6",
    title: "Free Cupcake with 5th Purchase",
    type: "loyalty",
    termsAndConditions: "After 5 purchases.",
    threshold: "5",
  },
  {
    id: "13",
    businessId: "7",
    title: "10% Off for New Customers",
    type: "intro",
    termsAndConditions: "First-time members only.",
  },
  {
    id: "14",
    businessId: "7",
    title: "Free Personal Training Session",
    type: "loyalty",
    termsAndConditions: "After 10 visits.",
    threshold: "10",
  },
  {
    id: "15",
    businessId: "8",
    title: "Free SEO Audit for New Clients",
    type: "intro",
    termsAndConditions: "One per business.",
  },
  {
    id: "16",
    businessId: "8",
    title: "25% Off Next Campaign",
    type: "loyalty",
    termsAndConditions: "After 3 completed campaigns.",
    threshold: "3",
  },
  {
    id: "17",
    businessId: "9",
    title: "Startup Package: Free Strategy Session",
    type: "intro",
    termsAndConditions: "For new clients only.",
  },
  {
    id: "18",
    businessId: "9",
    title: "Discounted Hourly Rate",
    type: "loyalty",
    termsAndConditions: "After 20 hours of consulting.",
    threshold: "20",
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

export const mockPosts: Post[] = [
  {
    id: "1",
    userId: "1",
    firstName: "Alice",
    title:
      "Just Launched: My Local Art Workshop Series! Join Us & Get Creative 🎨",
    description:
      "Excited to announce my new weekend art workshops for all ages! Whether you're a beginner or a seasoned artist, come connect, learn, and create together. First session is free—let’s make our neighborhood more colorful!",
    likes: "32",
    comments: "7",
    publishDate: "2024-06-10",
    avatarUrl:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    mediaUrl:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
    zapCount: "100",
  },
  {
    id: "2",
    userId: "3",
    firstName: "Charlie",
    title: "Must-See: My New Video on Local History!",
    description:
      "I just uploaded a new video exploring the rich history of our town. From hidden gems to famous landmarks, it's a journey through time. Check it out and let me know your thoughts!",
    likes: "10",
    comments: "2",
    publishDate: "2023-10-02",
    avatarUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    mediaUrl: "https://vimeo.com/153173314?&login=true",
    mediaType: "video",
    zapCount: "50",
  },
  {
    id: "3",
    userId: "4",
    firstName: "Diana",
    title: "Check Out My New Video on Local Wildlife!",
    description:
      "I just uploaded a new video showcasing the amazing wildlife in our area. From birds to deer, it's a must-watch for nature lovers! Let me know what you think in the comments.",
    likes: "15",
    comments: "3",
    publishDate: "2023-10-03",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    mediaUrl: "https://youtu.be/ilE0T2H5pF4",
    mediaType: "video",
    zapCount: "75",
  },
  {
    id: "4",
    userId: "2",
    firstName: "Bob",
    title: "Exploring Local Parks: My Favorite Spots 🌳",
    description:
      "I just published a new blog post about my favorite parks in the area. From hidden trails to scenic views, these spots are perfect for a weekend getaway. Check it out and share your favorites too!",
    likes: "8",
    comments: "1",
    publishDate: "2023-10-04",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    mediaUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
    zapCount: "60",
  },
  {
    id: "5",
    userId: "5",
    firstName: "Ethan",
    title: "Local Food Festival: My Experience & Recommendations 🍽️",
    description:
      "I had a blast at the local food festival this weekend! From delicious street food to amazing local vendors, it was a feast for the senses. Check out my top picks and let me know your favorites!",
    likes: "12",
    comments: "4",
    publishDate: "2023-10-05",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    mediaUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
    zapCount: "90",
  },
  {
    id: "6",
    userId: "6",
    firstName: "Fiona",
    title: "My New Video on Local Art Scene 🎨",
    description:
      "I just released a new video exploring the vibrant local art scene. From galleries to street art, there's so much creativity in our community. Check it out and let me know your thoughts!",
    likes: "20",
    comments: "6",
    publishDate: "2023-10-06",
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    mediaUrl: "https://youtu.be/hr2Im6lLJhA",
    mediaType: "video",
    zapCount: "110",
  },
  {
    id: "7",
    userId: "7",
    firstName: "George",
    title: "Need help with home repairs? I'm available this weekend!",
    description:
      "Hey neighbors! I'm a licensed handyman with 10+ years experience in home repairs. If you need help with anything around the house, feel free to reach out. I'm available this weekend and would love to assist you!",
    likes: "20",
    comments: "6",
    publishDate: "2023-10-06",
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1689629870780-5d0e655383e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    mediaUrl: "",
    mediaType: "text",
    zapCount: "40",
  },
];

/**
 * mockPromoters table/array tracks users who have opted in as promoters and their engagement with businesses/promotions.
 * This is useful for distinguishing between regular users and active promoters, and for storing promoter-specific metadata.
 */

export type Promoter = {
  id: string; // unique promoter id (will be same as userId)
  bio?: string;
  joinedAt: string;
  active: boolean;
  promotedBusinessIds?: string[]; // businesses they're promoting
  promotionIds?: string[]; // promotions they've created or are running
  referralCount?: string;
  zapCount?: string;
  totalClicks?: string;
  totalViews?: string;
  totalReferrals?: string;
  // You can add more fields as needed, e.g. payout info, social links, etc.
};

export const mockPromoters: Promoter[] = [
  {
    id: "1",
    bio: "Passionate about connecting people with great local businesses.",
    joinedAt: "2024-01-15",
    active: true,
    promotedBusinessIds: ["1", "4"],
    promotionIds: ["1"],
    referralCount: "30",
    zapCount: "34",
    totalClicks: "80",
    totalViews: "150",
    totalReferrals: "30",
  },
  {
    id: "4",
    bio: "Gardening and landscaping enthusiast.",
    joinedAt: "2024-03-10",
    active: true,
    promotedBusinessIds: ["4"],
    promotionIds: ["4"],
    referralCount: "100",
    zapCount: "96",
    totalClicks: "200",
    totalViews: "400",
    totalReferrals: "100",
  },
  {
    id: "7",
    bio: "Digital marketing expert for local businesses.",
    joinedAt: "2024-05-01",
    active: true,
    promotedBusinessIds: ["8"],
    promotionIds: ["7"],
    referralCount: "60",
    zapCount: "88",
    totalClicks: "120",
    totalViews: "240",
    totalReferrals: "60",
  },
];

/**
 * mockPromoterRatings tracks feedback from businesses about promoters.
 * Each record includes the promotionId, promoterId, businessId, ratings, and optional comments.
 */
export type PromoterRating = {
  id: string; // unique rating id
  promotionId: string;
  promoterId: string;
  businessId: string;
  communication: string; // 1-5
  brandAwareness: string; // 1-5
  easyToWorkWith: string; // 1-5
  wentAboveAndBeyond: string; // 1-5
  overall: string; // 1-5
  comment?: string;
  createdAt: string;
};

export const mockPromoterRatings: PromoterRating[] = [
  {
    id: "1",
    promotionId: "1",
    promoterId: "1",
    businessId: "1",
    communication: "5",
    brandAwareness: "4",
    easyToWorkWith: "5",
    wentAboveAndBeyond: "5",
    overall: "5",
    comment: "Great communication and really helped boost our brand locally.",
    createdAt: "2024-06-15",
  },
  {
    id: "2",
    promotionId: "4",
    promoterId: "4",
    businessId: "4",
    communication: "4",
    brandAwareness: "5",
    easyToWorkWith: "4",
    wentAboveAndBeyond: "5",
    overall: "5",
    comment: "Went above and beyond with creative ideas for our campaign.",
    createdAt: "2024-06-16",
  },
  {
    id: "3",
    promotionId: "7",
    promoterId: "7",
    businessId: "8",
    communication: "5",
    brandAwareness: "5",
    easyToWorkWith: "5",
    wentAboveAndBeyond: "4",
    overall: "5",
    comment: "Very professional and easy to work with.",
    createdAt: "2024-06-17",
  },
];

export type ZapTransaction = {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromNostrPubkey: string;
  toNostrPubkey: string;
  amountSats: number;
  createdAt: string;
  note?: string;
  relatedPromotionId?: string;
  relatedBusinessId?: string;
  zapType?: "promotion" | "reward" | "post" | "tip";
  status?: "pending" | "completed" | "failed";
};

export const mockZapTransactions: ZapTransaction[] = [
  {
    id: "1",
    fromUserId: "3",
    toUserId: "1",
    fromNostrPubkey:
      "npub1fromuser3xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    toNostrPubkey: "npub1touser1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    amountSats: 500,
    createdAt: "2024-06-15T10:30:00Z",
    note: "Great promotion!",
    relatedPromotionId: "1",
    zapType: "promotion",
    status: "completed",
  },
  {
    id: "2",
    fromUserId: "6",
    toUserId: "4",
    fromNostrPubkey:
      "npub1fromuser6xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    toNostrPubkey: "npub1touser4xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    amountSats: 250,
    createdAt: "2024-06-16T14:45:00Z",
    note: "Thanks for the gardening tips.",
    relatedBusinessId: "4",
    zapType: "reward",
    status: "completed",
  },
  {
    id: "3",
    fromUserId: "2",
    toUserId: "7",
    fromNostrPubkey:
      "npub1fromuser2xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    toNostrPubkey: "npub1touser7xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    amountSats: 1000,
    createdAt: "2024-06-17T09:20:00Z",
    note: "Awesome digital marketing campaign.",
    relatedPromotionId: "7",
    relatedBusinessId: "8",
    zapType: "promotion",
    status: "completed",
  },
  {
    id: "4",
    fromUserId: "1",
    toUserId: "5",
    fromNostrPubkey:
      "npub1fromuser1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    toNostrPubkey: "npub1touser5xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    amountSats: 150,
    createdAt: "2024-06-18T12:00:00Z",
    note: "Thanks for the auto repair advice.",
    relatedBusinessId: "5",
    zapType: "tip",
    status: "completed",
  },
  {
    id: "5",
    fromUserId: "4",
    toUserId: "2",
    fromNostrPubkey:
      "npub1fromuser4xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    toNostrPubkey: "npub1touser2xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    amountSats: 300,
    createdAt: "2024-06-18T15:30:00Z",
    note: "Appreciate your support!",
    relatedPromotionId: "2",
    zapType: "promotion",
    status: "completed",
  },
];
