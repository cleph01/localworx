import { getPromotionsByUserHandler } from "./userPromotionsController";

export async function GET(_: Request, context: { params: { npub: string } }) {
  return getPromotionsByUserHandler(context.params.npub);
}
