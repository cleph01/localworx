import { NextRequest } from "next/server";
import { getBusinessesByUserHandler } from "./userBusinessController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ npub: string }> }
) {
  const { npub } = await params;
  return getBusinessesByUserHandler(npub);
}
