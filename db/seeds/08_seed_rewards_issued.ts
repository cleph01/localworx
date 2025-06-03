// db/seeds/08_seed_rewards_issued.ts
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("rewards_issued").del();

  // Fetch business IDs
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

  const businessIdMap = Object.fromEntries(
    businesses.map((b) => [b.business_name, b.id])
  );

  // Fetch rewards and map by name + business
  const rewards = await knex("rewards").select("id", "name", "business_id");
  const rewardMap = Object.fromEntries(
    rewards.map((r) => [`${r.business_id}-${r.name}`, r.id])
  );

  // Fetch users and map by id or email
  const users = await knex("users").select("id");
  const userIdMap = Object.fromEntries(
    users.map((u) => [u.id, u.id]) // you could use email if you prefer
  );

  await knex("rewards_issued").insert([
    // User 1 receives intro-offers from businesses 1–3
    {
      user_id: userIdMap[1],
      business_id: businessIdMap["Bean & Brew"],
      reward_id: rewardMap[`${businessIdMap["Bean & Brew"]}-Free Small Coffee`],
      redeemed: true,
      resold: false,
    },
    {
      user_id: userIdMap[1],
      business_id: businessIdMap["The Vintage Cut"],
      reward_id:
        rewardMap[`${businessIdMap["The Vintage Cut"]}-First Cut Free`],
      redeemed: false,
      resold: false,
    },
    {
      user_id: userIdMap[1],
      business_id: businessIdMap["Rise & Shine Bakery"],
      reward_id:
        rewardMap[
          `${businessIdMap["Rise & Shine Bakery"]}-Free Croissant on First Visit`
        ],
      redeemed: false,
      resold: true,
    },

    // User 2 receives loyalty rewards from businesses 4–6
    {
      user_id: userIdMap[2],
      business_id: businessIdMap["Iron Temple"],
      reward_id: rewardMap[`${businessIdMap["Iron Temple"]}-Free Dessert`],
      redeemed: true,
      resold: false,
    },
    {
      user_id: userIdMap[2],
      business_id: businessIdMap["Tech Savvy"],
      reward_id:
        rewardMap[
          `${businessIdMap["Tech Savvy"]}-Free Screen Protector with Repair`
        ],
      redeemed: false,
      resold: false,
    },
    {
      user_id: userIdMap[2],
      business_id: businessIdMap["Green Sip"],
      reward_id:
        rewardMap[`${businessIdMap["Green Sip"]}-Buy 5 Smoothies, Get 1 Free`],
      redeemed: true,
      resold: false,
    },

    // User 3 receives in-kind rewards from businesses 7–9
    {
      user_id: userIdMap[3],
      business_id: businessIdMap["Grain & Glory"],
      reward_id: rewardMap[`${businessIdMap["Grain & Glory"]}-Free Engraving`],
      redeemed: true,
      resold: true,
    },
    {
      user_id: userIdMap[3],
      business_id: businessIdMap["Sound Roots"],
      reward_id:
        rewardMap[`${businessIdMap["Sound Roots"]}-Free String Replacement`],
      redeemed: false,
      resold: true,
    },
    {
      user_id: userIdMap[3],
      business_id: businessIdMap["Greenville Market Co."],
      reward_id:
        rewardMap[
          `${businessIdMap["Greenville Market Co."]}-Free Gift Wrapping`
        ],
      redeemed: false,
      resold: false,
    },
  ]);
}
