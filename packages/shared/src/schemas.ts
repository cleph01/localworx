import { z } from "zod";

export const lightningAddress = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "Enter a Lightning address like you@wallet.com");

export const slug = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lowercase letters, numbers and dashes only")
  .min(3)
  .max(60);

export const checkinRequest = z.object({
  slug,
  code: z.string().regex(/^\d{8}$/),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  ref: z.string().max(40).optional(),
});
export type CheckinRequest = z.infer<typeof checkinRequest>;

export const businessInput = z.object({
  name: z.string().trim().min(2).max(80),
  slug,
  description: z.string().trim().max(2000).default(""),
  category_id: z.number().int().positive(),
  address: z.string().trim().min(3).max(200),
  city: z.string().trim().min(2).max(80),
  state: z.string().trim().min(2).max(40),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  phone: z.string().trim().max(30).optional(),
  website: z.url().optional(),
  lightning_address: lightningAddress.optional(),
  hiring_promoters: z.boolean().default(false),
});
export type BusinessInput = z.infer<typeof businessInput>;

export const profileInput = z.object({
  display_name: z.string().trim().min(1).max(50),
  about: z.string().trim().max(500).optional(),
  picture_url: z.url().optional(),
  lightning_address: lightningAddress.optional(),
});

export const listingInput = z.object({
  reward_id: z.uuid(),
  price_sats: z.number().int().min(1).max(10_000_000),
});

export const signedEvent = z.object({
  id: z.string().regex(/^[0-9a-f]{64}$/),
  pubkey: z.string().regex(/^[0-9a-f]{64}$/),
  created_at: z.number().int(),
  kind: z.number().int(),
  tags: z.array(z.array(z.string())),
  content: z.string(),
  sig: z.string().regex(/^[0-9a-f]{128}$/),
});
