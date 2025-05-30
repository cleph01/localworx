import { NextRequest, NextResponse } from "next/server";
import { fetchBusinessesByUserNpub } from "./userBusinessService";

export async function getBusinessesByUserHandler(npub: string) {
  try {
    const businesses = await fetchBusinessesByUserNpub(npub);
    return NextResponse.json(businesses);
  } catch (err) {
    console.error("Failed to fetch user businesses", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
