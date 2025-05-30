import { NextRequest } from "next/server";
import { getUserByNpubHandler } from "./userController";

export async function GET(
  req: NextRequest,
  context: { params: { npub: string } }
) {
  return getUserByNpubHandler(context.params.npub);
}
