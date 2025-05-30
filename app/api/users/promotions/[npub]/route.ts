import { getPromotionsByUserHandler } from "./userPromotionsController";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ npub: string }> }
) {
  const { npub } = await params;
  return getPromotionsByUserHandler(npub);
}
