import { NextResponse } from "next/server";
import { fetchUserByNpub } from "./userService";

export async function getUserByNpubHandler(npub: string) {
  try {
    if (!npub) {
      return NextResponse.json({ error: "Missing npub" }, { status: 400 });
    }

    const user = await fetchUserByNpub(npub);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("Error in getUserByNpubHandler:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
