// db/seeds/05_seed_rewards.ts
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("rewards").del();

  // Fetch existing businesses to map their IDs
  const businesses = await knex("businesses")
    .select("id", "business_name")
    .whereIn("business_name", [
      "Bean & Brew",
      "The Vintage Cut",
      "Rise & Shine Bakery",
      "Iron Temple",
      "Tech Savvy",
      "Green Sip",
      "Grain & Glory",
      "Sound Roots",
      "Greenville Market Co.",
    ]);

  // Helper map
  const businessIdMap = Object.fromEntries(
    businesses.map((b) => [b.business_name, b.id])
  );

  await knex("rewards").insert([
    // Bean & Brew (business_id: 1)
    {
      business_id: businessIdMap["Bean & Brew"],
      name: "Free Small Coffee",
      description: "Enjoy a free small organic coffee on your first visit.",
      image_url: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      business_id: businessIdMap["Bean & Brew"],
      name: "Free Muffin with Coffee",
      description: "Receive a fresh muffin with any coffee order.",
      image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
      reward_type: "loyalty",
      threshold: 4,
    },
    {
      business_id: businessIdMap["Bean & Brew"],
      name: "Free Bag of Beans",
      description: "Get a free bag of our house blend beans.",
      image_url: "https://images.unsplash.com/photo-1559563365-98a6d4be3b28",
      reward_type: "in-kind",
      threshold: null,
    },

    // The Vintage Cut (business_id: 2)
    {
      business_id: businessIdMap["The Vintage Cut"],
      name: "First Cut Free",
      description: "Enjoy your first haircut on the house.",
      image_url: "https://images.unsplash.com/photo-1603052875294-246f96c3189b",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      business_id: businessIdMap["The Vintage Cut"],
      name: "10% Off Your Next Haircut",
      description:
        "Show your loyalty and receive a 10% discount on your next cut.",
      image_url: "https://images.unsplash.com/photo-1603415526960-f7e0328f1d5f",
      reward_type: "loyalty",
      threshold: 5,
    },
    {
      business_id: businessIdMap["The Vintage Cut"],
      name: "Free Shave with Haircut",
      description: "Get a complimentary shave with your haircut.",
      image_url: "https://images.unsplash.com/photo-1613553492141-2ff4ab4c6a46",
      reward_type: "in-kind",
      threshold: null,
    },

    // Rise & Shine Bakery (business_id: 3)
    {
      business_id: businessIdMap["Rise & Shine Bakery"],
      name: "Free Croissant on First Visit",
      description: "Try our flaky croissant, free for first-time visitors.",
      image_url: "https://images.unsplash.com/photo-1542831371-d531d36971e6",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      business_id: businessIdMap["Rise & Shine Bakery"],
      name: "Buy 4 Pastries, Get 1 Free",
      description: "Loyalty reward for our pastry lovers.",
      image_url: "https://images.unsplash.com/photo-1608198093002-ad4e005484f9",
      reward_type: "loyalty",
      threshold: 5,
    },
    {
      business_id: businessIdMap["Rise & Shine Bakery"],
      name: "Free Loaf of Bread",
      description: "Take home a fresh artisan loaf of your choice.",
      image_url: "https://images.unsplash.com/photo-1604908177225-786f12257b51",
      reward_type: "in-kind",
      threshold: null,
    },

    // Iron Temple (business_id: 4)
    {
      business_id: businessIdMap["Iron Temple"],
      name: "Free Gym Day Pass",
      description: "Access all facilities with a complimentary day pass.",
      image_url: "https://images.unsplash.com/photo-1583454110551-21c76d3b2935",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      business_id: businessIdMap["Iron Temple"],
      name: "Free Dessert",
      description: "Get a dessert of your choice free with your entree.",
      image_url: "https://images.unsplash.com/photo-1590080875976-7c2f7c7ef5f8",
      reward_type: "loyalty",
      threshold: 3,
    },
    {
      business_id: businessIdMap["Iron Temple"],
      name: "Free Personal Training Session",
      description:
        "Claim a complimentary one-on-one session with a certified coach.",
      image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      reward_type: "in-kind",
      threshold: null,
    },

    // Tech Savvy (business_id: 5)
    {
      business_id: businessIdMap["Tech Savvy"],
      name: "Free Phone Diagnostic",
      description: "Get a full phone diagnostic free on your first visit.",
      image_url: "https://images.unsplash.com/photo-1610383676887-aee9c71db3d7",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      business_id: businessIdMap["Tech Savvy"],
      name: "Free Screen Protector with Repair",
      description: "Receive a free screen protector after 3 paid services.",
      image_url: "https://images.unsplash.com/photo-1597705994232-03d85363f1a0",
      reward_type: "loyalty",
      threshold: 3,
    },
    {
      business_id: businessIdMap["Tech Savvy"],
      name: "One Free Car Wash",
      description: "Enjoy a free full-service car wash on us.",
      image_url: "https://images.unsplash.com/photo-1615986206585-bd0b82c1aee7",
      reward_type: "in-kind",
      threshold: null,
    },

    // Green Sip (business_id: 6)
    {
      business_id: businessIdMap["Green Sip"],
      name: "Free Smoothie on First Visit",
      description: "Your first smoothie is on the house!",
      image_url: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      business_id: businessIdMap["Green Sip"],
      name: "Buy 5 Smoothies, Get 1 Free",
      description: "Earn a free smoothie after your fifth purchase.",
      image_url: "https://images.unsplash.com/photo-1585238341986-2d2b0e63d3a5",
      reward_type: "loyalty",
      threshold: 5,
    },
    {
      business_id: businessIdMap["Green Sip"],
      name: "Free Reusable Bottle",
      description: "Get a branded reusable bottle with your order.",
      image_url: "https://images.unsplash.com/photo-1563092154-57db89c1959f",
      reward_type: "in-kind",
      threshold: null,
    },

    // Grain & Glory (business_id: 7)
    {
      business_id: businessIdMap["Grain & Glory"],
      name: "Free Wood Coaster Set",
      description: "Get a handcrafted coaster set on your first purchase.",
      image_url: "https://images.unsplash.com/photo-1621607543607-61f6e1363e0e",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      business_id: businessIdMap["Grain & Glory"],
      name: "10% Off Custom Orders",
      description: "Loyal customers get 10% off every 3rd custom order.",
      image_url: "https://images.unsplash.com/photo-1605810230434-7631b7112a6c",
      reward_type: "loyalty",
      threshold: 3,
    },
    {
      business_id: businessIdMap["Grain & Glory"],
      name: "Free Engraving",
      description: "Get a free engraving on your next purchase.",
      image_url: "https://images.unsplash.com/photo-1617053836495-4e1cf576c75e",
      reward_type: "in-kind",
      threshold: null,
    },

    // Sound Roots (business_id: 8)
    {
      business_id: businessIdMap["Sound Roots"],
      name: "Free Intro Music Lesson",
      description: "Get a 30-minute intro lesson on any instrument.",
      image_url: "https://images.unsplash.com/photo-1594312915251-48c1904f2a3e",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      business_id: businessIdMap["Sound Roots"],
      name: "5th Lesson Free",
      description: "Loyal students receive their 5th lesson free.",
      image_url: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36d",
      reward_type: "loyalty",
      threshold: 5,
    },
    {
      business_id: businessIdMap["Sound Roots"],
      name: "Free String Replacement",
      description: "One-time free replacement for guitar or violin strings.",
      image_url: "https://images.unsplash.com/photo-1601747944660-b6d24db2893c",
      reward_type: "in-kind",
      threshold: null,
    },

    // Greenville Market Co. (business_id: 9)
    {
      business_id: businessIdMap["Greenville Market Co."],
      name: "Free Tote Bag",
      description: "Get a branded reusable tote on your first visit.",
      image_url: "https://images.unsplash.com/photo-1614605521028-17f551cfb9e4",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      business_id: businessIdMap["Greenville Market Co."],
      name: "Loyalty Produce Pack",
      description: "Receive a special produce pack after 6 visits.",
      image_url: "https://images.unsplash.com/photo-1570197781534-d4f9f3e0dbb0",
      reward_type: "loyalty",
      threshold: 6,
    },
    {
      business_id: businessIdMap["Greenville Market Co."],
      name: "Free Gift Wrapping",
      description: "Get one item wrapped professionally for free.",
      image_url: "https://images.unsplash.com/photo-1603575448362-3a3b5df13f65",
      reward_type: "in-kind",
      threshold: null,
    },
  ]);
}
