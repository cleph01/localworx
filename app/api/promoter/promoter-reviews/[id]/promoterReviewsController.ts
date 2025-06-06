import { NextResponse } from "next/server";
import { fetchPromoterReviewsById } from "./promoterReviewsService";

export async function getPromoterReviewsByIdHandler(id: string | number) {
  try {
    if (!id) {
      return NextResponse.json({ error: "Missing Id" }, { status: 400 });
    }

    const user = await fetchPromoterReviewsById(id);
    if (!user) {
      return NextResponse.json(
        { error: "Promoter Reviews not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("Error in getPromoterReviewsByIdHandler:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
