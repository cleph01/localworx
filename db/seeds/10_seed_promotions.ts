// db/seeds/10_seed_promotions.ts
import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("promotions").del();

  await knex("promotions").insert([
    {
      id: 1,
      business_id: 1,
      promoter_id: 1,
      title: "☕ Free Coffee Friday!",
      description: "Buy any pastry, get a free small coffee this Friday only.",
      media_url:
        "https://plus.unsplash.com/premium_photo-1722686494449-7a00200fa5f2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZyZWUlMjBjb2ZmZWV8ZW58MHx8MHx8fDA%3D",
      media_type: "image",
      expires_at: new Date(Date.now() + 3 * 86400000),
      is_active: true,
      terms_and_conditions:
        "Offer valid this Friday only. One free small coffee per customer. Must purchase a pastry.",
    },
    {
      id: 2,
      business_id: 4,
      promoter_id: 2,
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
      id: 3,
      business_id: 5,
      promoter_id: 1,
      title: "🔧 Free Screen Protector",
      description:
        "Cracked screen repair comes with a free tempered glass protector.",
      media_url:
        "https://media.istockphoto.com/id/922690800/photo/man-applying-protective-tempered-glass-to-phone-screen.webp?a=1&b=1&s=612x612&w=0&k=20&c=vF333jCRHZbJA3xJj4NV7cBSl9gRJqkraEt5y0yO83I=",
      media_type: "image",
      expires_at: new Date(Date.now() + 5 * 86400000),
      is_active: true,
      terms_and_conditions:
        "Protector must be claimed at time of service. Cannot be redeemed separately.",
    },
    {
      id: 4,
      business_id: 3,
      promoter_id: 2,
      title: "🥐 Morning Special: Free Croissant",
      description:
        "Get a free croissant with any espresso purchase until 11am.",
      media_url:
        "https://images.unsplash.com/photo-1612366747681-e4ca6992b1e9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNyb2lzc2FudHxlbnwwfHwwfHx8MA%3D%3D",
      media_type: "image",
      expires_at: new Date(Date.now() + 4 * 86400000),
      is_active: true,
      terms_and_conditions:
        "Valid 7–11am only. One per customer. Espresso purchase required.",
    },
    {
      id: 5,
      business_id: 6,
      promoter_id: 1,
      title: "🥤 BOGO Smoothies All Week!",
      description: "Buy one smoothie, get one free. Valid Mon–Fri.",
      media_url:
        "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNtb290aGllfGVufDB8fDB8fHww",
      media_type: "image",
      expires_at: new Date(Date.now() + 6 * 86400000),
      is_active: true,
      terms_and_conditions:
        "Free smoothie must be of equal or lesser value. Offer valid weekdays only.",
    },
    {
      id: 6,
      business_id: 2,
      promoter_id: 2,
      title: "✂️ First Cut Free",
      description: "New customers get their first haircut absolutely free.",
      media_url: "https://youtu.be/6jTMYDzoGAo?",
      media_type: "video",
      expires_at: new Date(Date.now() + 10 * 86400000),
      is_active: true,
      terms_and_conditions:
        "Must be a new customer. Appointment required. No walk-ins for this promo.",
    },
    {
      id: 7,
      business_id: 8,
      promoter_id: 1,
      title: "🎸 Free Guitar Restringing",
      description: "Buy a pack of strings, we’ll restring your guitar free.",
      media_url:
        "https://plus.unsplash.com/premium_photo-1681844014126-5950a9c8060b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3VpdGFyJTIwcmVzdHJpbmd8ZW58MHx8MHx8fDA%3D",
      media_type: "image",
      expires_at: new Date(Date.now() + 8 * 86400000),
      is_active: true,
      terms_and_conditions:
        "Applies to standard 6-string acoustic or electric guitars. Strings must be purchased in-store.",
    },
    {
      id: 8,
      business_id: 9,
      promoter_id: 2,
      title: "🎁 Free Gift Wrapping Weekend",
      description:
        "Buy anything in-store this weekend, get it gift-wrapped free!",
      media_url:
        "https://images.unsplash.com/photo-1709364528811-5c920cb3adad?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHZlZ2V0YWJsZSUyMHdyYXBwaW5nfGVufDB8fDB8fHww",
      media_type: "image",
      expires_at: new Date(Date.now() + 2 * 86400000),
      is_active: true,
      terms_and_conditions:
        "Valid on in-store purchases only. Offer expires Sunday at close of business.",
    },
  ]);
}
