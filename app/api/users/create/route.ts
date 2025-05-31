import { NextRequest } from "next/server";
import { createUserHandler } from "./createUserController";

export async function POST(req: NextRequest) {
  return createUserHandler(req);
}
