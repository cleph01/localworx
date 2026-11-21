import "server-only";
import Stripe from "stripe";
import { fees } from "@/lib/fees";

let client: Stripe | null = null;
export function stripe(): Stripe {
  if (!fees.stripeKey) throw new Error("Card payments aren't set up");
  client ??= new Stripe(fees.stripeKey);
  return client;
}
