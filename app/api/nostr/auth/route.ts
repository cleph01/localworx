import { NextRequest } from "next/server";
import { authenticateNostrUser } from "./authController";

export async function POST(request: NextRequest) {
  return authenticateNostrUser(request);
}
