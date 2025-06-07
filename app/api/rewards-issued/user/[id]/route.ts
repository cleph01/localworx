import { NextRequest } from "next/server";
import { getRewardIssuedByUserIdHandler } from "./rewardsIssuedController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log("Fetching rewards issued for user ID:", id);
  return getRewardIssuedByUserIdHandler(id);
}
