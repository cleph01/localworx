import { NextRequest } from "next/server";
import { getBusinessRewardsHandler } from "./businessRewardsController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params;
  return getBusinessRewardsHandler(businessId);
}
