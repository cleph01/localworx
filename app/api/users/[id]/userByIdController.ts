import { NextResponse } from "next/server";
import { fetchUserById } from "./userByIdService";

export async function getUserByIdHandler(id: string) {
  try {
    if (!id) {
      return NextResponse.json({ error: "Missing Id" }, { status: 400 });
    }

    const user = await fetchUserById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("Error in getUserByIdHandler:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
