import { NextRequest } from "next/server";
import { getUserByNpubHandler } from "./userByNpubController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ npub: string }> }
) {
  const { npub } = await params;
  return getUserByNpubHandler(npub);
}
