// db/seeds/10_seed_promotions.ts
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("promotions").del();

  const businesses = await knex("businesses")
    .select("id", "business_name")
    .whereIn("business_name", [
      "Bean & Brew",
      "Iron Temple",
      "Tech Savvy",
      "Rise & Shine Bakery",
      "Green Sip",
      "The Vintage Cut",
      "Sound Roots",
      "Greenville Market Co.",
    ]);

  const business_map = Object.fromEntries(
    businesses.map((b) => [b.business_name, b.id])
  );

  const promoters = await knex("users").select("id").orderBy("id");
  const promoter_1 = promoters[0];
  const promoter_2 = promoters[1];

  await knex("promotions").insert([
    {
      business_id: business_map["Bean & Brew"],
      promoter_id: promoter_1.id,
      title: "☕ Free Coffee Friday!",
      description: "Buy any pastry, get a free small coffee this Friday only.",
      media_url: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
      media_type: "image",
      expires_at: new Date(Date.now() + 3 * 86400000),
      is_active: true,
      terms_and_conditions:
        "Offer valid this Friday only. One free small coffee per customer. Must purchase a pastry.",
    },
    {
      business_id: business_map["Iron Temple"],
      promoter_id: promoter_2.id,
      title: "💪 One Week Free Gym Trial",
      description: "No contracts. No catch. Just sweat. Try us for a week!",
      media_url: "https://www.youtube.com/watch?v=ml6cT4AZdqI",
      media_type: "video",
      expires_at: new Date(Date.now() + 7 * 86400000),
      is_active: true,
      terms_and_conditions:
        "Valid for new members only. Trial must be used within 30 days of claim.",
    },
    {
      business_id: business_map["Tech Savvy"],
      promoter_id: promoter_1.id,
      title: "🔧 Free Screen Protector",
      description:
        "Cracked screen repair comes with a free tempered glass protector.",
      media_url: "https://images.unsplash.com/photo-1587574293340-ec3e1a49f1c9",
      media_type: "image",
      expires_at: new Date(Date.now() + 5 * 86400000),
      is_active: true,
      terms_and_conditions:
        "Protector must be claimed at time of service. Cannot be redeemed separately.",
    },
    {
      business_id: business_map["Rise & Shine Bakery"],
      promoter_id: promoter_2.id,
      title: "🥐 Morning Special: Free Croissant",
      description:
        "Get a free croissant with any espresso purchase until 11am.",
      media_url: "https://images.unsplash.com/photo-1509440159598-9530b3c7a5ae",
      media_type: "image",
      expires_at: new Date(Date.now() + 4 * 86400000),
      is_active: true,
      terms_and_conditions:
        "Valid 7–11am only. One per customer. Espresso purchase required.",
    },
    {
      business_id: business_map["Green Sip"],
      promoter_id: promoter_1.id,
      title: "🥤 BOGO Smoothies All Week!",
      description: "Buy one smoothie, get one free. Valid Mon–Fri.",
      media_url: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
      media_type: "image",
      expires_at: new Date(Date.now() + 6 * 86400000),
      is_active: true,
      terms_and_conditions:
        "Free smoothie must be of equal or lesser value. Offer valid weekdays only.",
    },
    {
      business_id: business_map["The Vintage Cut"],
      promoter_id: promoter_2.id,
      title: "✂️ First Cut Free",
      description: "New customers get their first haircut absolutely free.",
      media_url: "https://www.youtube.com/watch?v=urU1l0PM_4I",
      media_type: "video",
      expires_at: new Date(Date.now() + 10 * 86400000),
      is_active: true,
      terms_and_conditions:
        "Must be a new customer. Appointment required. No walk-ins for this promo.",
    },
    {
      business_id: business_map["Sound Roots"],
      promoter_id: promoter_1.id,
      title: "🎸 Free Guitar Restringing",
      description: "Buy a pack of strings, we’ll restring your guitar free.",
      media_url: "https://images.unsplash.com/photo-1598387857532-290b61a7b38b",
      media_type: "image",
      expires_at: new Date(Date.now() + 8 * 86400000),
      is_active: true,
      terms_and_conditions:
        "Applies to standard 6-string acoustic or electric guitars. Strings must be purchased in-store.",
    },
    {
      business_id: business_map["Greenville Market Co."],
      promoter_id: promoter_2.id,
      title: "🎁 Free Gift Wrapping Weekend",
      description:
        "Buy anything in-store this weekend, get it gift-wrapped free!",
      media_url: "https://images.unsplash.com/photo-1542051841857-3490f9b9f2cc",
      media_type: "image",
      expires_at: new Date(Date.now() + 2 * 86400000),
      is_active: true,
      terms_and_conditions:
        "Valid on in-store purchases only. Offer expires Sunday at close of business.",
    },
  ]);
}
