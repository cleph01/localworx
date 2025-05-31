// app/api/users/create/createUserController.ts

import { NextRequest, NextResponse } from "next/server";
import { createUserService } from "./createUserService";

export async function createUserHandler(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.npub) {
      return NextResponse.json({ error: "Missing pubkey" }, { status: 400 });
    }

    const user = await createUserService(body);
    return NextResponse.json({ user });
  } catch (err) {
    console.error("Error in createUserHandler:", err);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
