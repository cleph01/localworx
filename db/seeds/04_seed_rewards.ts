// db/seeds/05_seed_rewards.ts
import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("rewards").del();

  // Fetch existing businesses to map their IDs
  // const businesses = await knex("businesses")
  //   .select("id", "business_name")
  //   .whereIn("business_name", [
  //     "Bean & Brew",
  //     "The Vintage Cut",
  //     "Rise & Shine Bakery",
  //     "Iron Temple",
  //     "Tech Savvy",
  //     "Green Sip",
  //     "Grain & Glory",
  //     "Sound Roots",
  //     "Greenville Market Co.",
  //   ]);

  // // Helper map
  // const businessIdMap = Object.fromEntries(
  //   businesses.map((b) => [b.business_name, b.id])
  // );

  await knex("rewards").insert([
    // Bean & Brew (business_id: 1)
    {
      id: 1,
      business_id: 1,
      name: "Free Small Coffee",
      description: "Enjoy a free small organic coffee on your first visit.",
      image_url:
        "https://plus.unsplash.com/premium_photo-1722686494449-7a00200fa5f2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZyZWUlMjBjb2ZmZWV8ZW58MHx8MHx8fDA%3D",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      id: 2,
      business_id: 1,
      name: "Free Muffin with Coffee",
      description: "Receive a fresh muffin with any coffee order.",
      image_url:
        "https://images.unsplash.com/photo-1637087788449-222cf1da072a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWUlMjBtdWZmaW58ZW58MHx8MHx8fDA%3D",
      reward_type: "loyalty",
      threshold: 4,
    },
    {
      id: 3,
      business_id: 1,
      name: "Free Bag of Beans",
      description: "Get a free bag of our house blend beans.",
      image_url:
        "https://images.unsplash.com/photo-1671225137978-aa9a19071b9a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvZmZlZSUyMGJlYW5zJTIwYmFnfGVufDB8fDB8fHww",
      reward_type: "in-kind",
      threshold: null,
    },

    // The Vintage Cut (business_id: 2)
    {
      id: 4,
      business_id: 2,
      name: "First Cut Free",
      description: "Enjoy your first haircut on the house.",
      image_url:
        "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGJhcmJlciUyMHNob3B8ZW58MHx8MHx8fDA%3D",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      id: 5,
      business_id: 2,
      name: "10% Off Your Next Haircut",
      description:
        "Show your loyalty and receive a 10% discount on your next cut.",
      image_url:
        "https://images.unsplash.com/photo-1647140655214-e4a2d914971f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGJhcmJlciUyMHNob3B8ZW58MHx8MHx8fDA%3D",
      reward_type: "loyalty",
      threshold: 5,
    },
    {
      id: 6,
      business_id: 2,
      name: "Free Shave with Haircut",
      description: "Get a complimentary shave with your haircut.",
      image_url:
        "https://images.unsplash.com/photo-1532710093739-9470acff878f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJhcmJlciUyMHNob3B8ZW58MHx8MHx8fDA%3D",
      reward_type: "in-kind",
      threshold: null,
    },

    // Rise & Shine Bakery (business_id: 3)
    {
      id: 7,
      business_id: 3,
      name: "Free Croissant on First Visit",
      description: "Try our flaky croissant, free for first-time visitors.",
      image_url:
        "https://images.unsplash.com/photo-1612366747681-e4ca6992b1e9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNyb2lzc2FudHxlbnwwfHwwfHx8MA%3D%3D",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      id: 8,
      business_id: 3,
      name: "Buy 4 Pastries, Get 1 Free",
      description: "Loyalty reward for our pastry lovers.",
      image_url:
        "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFzdHJ5fGVufDB8fDB8fHww",
      reward_type: "loyalty",
      threshold: 5,
    },
    {
      id: 9,
      business_id: 3,
      name: "Free Loaf of Bread",
      description: "Take home a fresh artisan loaf of your choice.",
      image_url:
        "https://images.unsplash.com/photo-1649444719049-bc39a80cda65?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGxvYWYlMjBvZiUyMGJyZWFkfGVufDB8fDB8fHww",
      reward_type: "in-kind",
      threshold: null,
    },

    // Iron Temple (business_id: 4)
    {
      id: 10,
      business_id: 4,
      name: "Free Gym Day Pass",
      description: "Access all facilities with a complimentary day pass.",
      image_url:
        "https://images.unsplash.com/photo-1623874514711-0f321325f318?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3ltfGVufDB8fDB8fHww",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      id: 11,
      business_id: 4,
      name: "Free Dessert",
      description:
        "Get a healthy dessert of your choice free with your workout.",
      image_url:
        "https://images.unsplash.com/photo-1554886729-fe8d4499a108?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb3RlaW4lMjBiYXJ8ZW58MHx8MHx8fDA%3D",
      reward_type: "loyalty",
      threshold: 3,
    },
    {
      id: 12,
      business_id: 4,
      name: "Free Personal Training Session",
      description:
        "Claim a complimentary one-on-one session with a certified coach.",
      image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      reward_type: "in-kind",
      threshold: null,
    },

    // Tech Savvy (business_id: 5)
    {
      id: 13,
      business_id: 5,
      name: "Free Phone Diagnostic",
      description: "Get a full phone diagnostic free on your first visit.",
      image_url:
        "https://images.unsplash.com/photo-1676311522524-fa7c0bffd644?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2VsbCUyMHBob25lJTIwY2hlY2t1cHxlbnwwfHwwfHx8MA%3D%3D",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      id: 14,
      business_id: 5,
      name: "Free Screen Protector with Repair",
      description: "Receive a free screen protector after 3 paid services.",
      image_url:
        "https://media.istockphoto.com/id/922690800/photo/man-applying-protective-tempered-glass-to-phone-screen.webp?a=1&b=1&s=612x612&w=0&k=20&c=vF333jCRHZbJA3xJj4NV7cBSl9gRJqkraEt5y0yO83I=",
      reward_type: "loyalty",
      threshold: 3,
    },
    {
      id: 15,
      business_id: 5,
      name: "One Free Memory Migration & Wash",
      description: "Enjoy a free high-speed memory transfer on us.",
      image_url:
        "https://images.unsplash.com/photo-1667984390527-850f63192709?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNlbGwlMjBwaG9uZSUyMG1lbW9yeSUyMHRyYW5zZmVyfGVufDB8fDB8fHww",
      reward_type: "in-kind",
      threshold: null,
    },

    // Green Sip (business_id: 6)
    {
      id: 16,
      business_id: 6,
      name: "Free Smoothie on First Visit",
      description: "Your first smoothie is on the house!",
      image_url:
        "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNtb290aGllfGVufDB8fDB8fHww",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      id: 17,
      business_id: 6,
      name: "Buy 5 Smoothies, Get 1 Free",
      description: "Earn a free smoothie after your fifth purchase.",
      image_url:
        "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNtb290aGllfGVufDB8fDB8fHww",
      reward_type: "loyalty",
      threshold: 5,
    },
    {
      id: 18,
      business_id: 6,
      name: "Free Reusable Bottle",
      description: "Get a branded reusable bottle with your order.",
      image_url:
        "https://images.unsplash.com/photo-1695793303287-d5f4005ed721?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1ldGFsJTIwc21vb3RoaWUlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D",
      reward_type: "in-kind",
      threshold: null,
    },

    // Grain & Glory (business_id: 7)
    {
      id: 19,
      business_id: 7,
      name: "Free Wood Coaster Set",
      description: "Get a handcrafted coaster set on your first purchase.",
      image_url:
        "https://images.unsplash.com/photo-1646006409578-7adfea4f40db?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29vZCUyMGNvYXN0ZXJ8ZW58MHx8MHx8fDA%3D",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      id: 20,
      business_id: 7,
      name: "10% Off Custom Orders",
      description: "Loyal customers get 10% off every 3rd custom order.",
      image_url:
        "https://images.unsplash.com/photo-1611021061421-93741ec41ce1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnBlbnRlcnxlbnwwfHwwfHx8MA%3D%3D",
      reward_type: "loyalty",
      threshold: 3,
    },
    {
      id: 21,
      business_id: 7,
      name: "Free Engraving",
      description: "Get a free engraving on your next purchase.",
      image_url:
        "https://images.unsplash.com/photo-1497219055242-93359eeed651?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhcnBlbnRlcnxlbnwwfHwwfHx8MA%3D%3D",
      reward_type: "in-kind",
      threshold: null,
    },

    // Sound Roots (business_id: 8)
    {
      id: 22,
      business_id: 8,
      name: "Free Intro Music Lesson",
      description: "Get a 30-minute intro lesson on any instrument.",
      image_url:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVzaWMlMjBsZXNzb258ZW58MHx8MHx8fDA%3D",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      id: 23,
      business_id: 8,
      name: "5th Lesson Free",
      description: "Loyal students receive their 5th lesson free.",
      image_url:
        "https://images.unsplash.com/photo-1488376739361-ed24c9beb6d0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG11c2ljJTIwbGVzc29ufGVufDB8fDB8fHww",
      reward_type: "loyalty",
      threshold: 5,
    },
    {
      id: 24,
      business_id: 8,
      name: "Free String Replacement",
      description: "One-time free replacement for guitar or violin strings.",
      image_url:
        "https://plus.unsplash.com/premium_photo-1681844014126-5950a9c8060b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3VpdGFyJTIwcmVzdHJpbmd8ZW58MHx8MHx8fDA%3D",
      reward_type: "in-kind",
      threshold: null,
    },

    // Greenville Market Co. (business_id: 9)
    {
      id: 25,
      business_id: 9,
      name: "Free Tote Bag",
      description: "Get a branded reusable tote on your first visit.",
      image_url:
        "https://images.unsplash.com/photo-1641568159866-2321c4a8fe59?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG9yZ2FuaWMlMjB0b3RlJTIwYmFnfGVufDB8fDB8fHww",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      id: 26,
      business_id: 9,
      name: "Loyalty Produce Pack",
      description: "Receive a special produce pack after 6 visits.",
      image_url:
        "https://images.unsplash.com/photo-1638024912888-ac77d663c72f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3JnYW5pYyUyMHRvdGUlMjBiYWd8ZW58MHx8MHx8fDA%3D",
      reward_type: "loyalty",
      threshold: 6,
    },
    {
      id: 27,
      business_id: 9,
      name: "Free Gift Wrapping",
      description: "Get one item wrapped professionally for free.",
      image_url:
        "https://images.unsplash.com/photo-1709364528811-5c920cb3adad?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHZlZ2V0YWJsZSUyMHdyYXBwaW5nfGVufDB8fDB8fHww",
      reward_type: "in-kind",
      threshold: null,
    },
    // Jack's Garage (business_id: 10)
    {
      id: 28,
      business_id: 10,
      name: "Free Oil Change Inspection",
      description: "Get a complimentary inspection with your first oil change.",
      image_url:
        "https://plus.unsplash.com/premium_photo-1682147578664-b944bf7cde8e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXV0byUyMGluc3BlY3Rpb258ZW58MHx8MHx8fDA%3D",
      reward_type: "intro-offer",
      threshold: null,
    },
    {
      id: 29,
      business_id: 10,
      name: "Free Tire Rotation After 4 Visits",
      description: "Loyal customers get a free tire rotation after 4 services.",
      image_url:
        "https://plus.unsplash.com/premium_photo-1661717332817-7e668ac1c6fe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGlyZSUyMHJlcGxhY2VtZW50fGVufDB8fDB8fHww",
      reward_type: "loyalty",
      threshold: 4,
    },
    {
      id: 30,
      business_id: 10,
      name: "Free Air Freshener",
      description: "Receive a complimentary air freshener with any service.",
      image_url:
        "https://media.istockphoto.com/id/1300792141/photo/car-air-freshener-mounted-to-ventilation-panel.webp?a=1&b=1&s=612x612&w=0&k=20&c=joqwZ14_bBVTh_sZVp7vyb5WBECl8IUBzKLJgJof-Z4=",
      reward_type: "in-kind",
      threshold: null,
    },
  ]);
}
