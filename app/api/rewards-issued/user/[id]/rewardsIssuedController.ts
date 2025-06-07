import { NextResponse } from "next/server";
import { fetchRewardIssuedByUserId } from "./rewardsIssuedService";

export async function getRewardIssuedByUserIdHandler(id: string) {
  try {
    if (!id) {
      return NextResponse.json({ error: "Missing Id" }, { status: 400 });
    }

    const reward = await fetchRewardIssuedByUserId(id);
    if (!reward) {
      return NextResponse.json(
        { error: "Reward issued not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(reward);
  } catch (err) {
    console.error("Error in getRewardIssuedByUserIdHandler:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
