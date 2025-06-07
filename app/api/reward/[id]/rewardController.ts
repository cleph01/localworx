import { NextResponse } from "next/server";
import { fetchRewardById } from "./rewardService";

export async function getRewardByIdHandler(id: string) {
  try {
    if (!id) {
      return NextResponse.json({ error: "Missing Id" }, { status: 400 });
    }

    const user = await fetchRewardById(id);
    if (!user) {
      return NextResponse.json(
        { error: "Reward issued not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("Error in getRewardIssuedByUserIdHandler:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
