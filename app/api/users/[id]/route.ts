import { NextRequest } from "next/server";
import { getUserByIdHandler } from "./userByIdController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return getUserByIdHandler(id);
}
