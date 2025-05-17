import { NextRequest, NextResponse } from "next/server";
import { generateKeypairService } from "./keygenService";

export async function generateKeypairController(req: NextRequest) {
  try {
    const keypair = generateKeypairService();
    return NextResponse.json(keypair);
  } catch (err) {
    console.error("Key generation failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
