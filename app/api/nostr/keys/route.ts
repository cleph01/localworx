import { generateKeypairController } from "./keygenController";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return generateKeypairController(req);
}
