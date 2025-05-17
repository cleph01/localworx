import { generateKeypairController } from "./keygenController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return generateKeypairController(req);
}
