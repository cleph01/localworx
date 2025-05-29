import { NextRequest, NextResponse } from "next/server";
import { createSubwalletService } from "./createSubwalletService";

export async function createSubwalletController(req: NextRequest) {
  const { username } = await req.json();
  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  try {
    const result = await createSubwalletService(username);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Error creating subwallet:", err);
    return NextResponse.json(
      { error: "Failed to create wallet" },
      { status: 500 }
    );
  }
}
