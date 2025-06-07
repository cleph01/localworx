import { NextRequest } from "next/server";
import { getRewardByIdHandler } from "./rewardController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return getRewardByIdHandler(id);
}
