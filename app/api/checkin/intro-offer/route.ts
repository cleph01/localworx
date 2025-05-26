// app/api/checkin/intro-offer/[businessId]/route.ts

import { NextRequest, NextResponse } from "next/server";

// 🔧 Mock DB functions
async function getUserCheckinCount(userId: string, businessId: string) {
  return 0; // Assume 0 for first-time
}

async function getBusinessIntroOffer(businessId: string) {
  return "10% off your first purchase!";
}

export async function GET(
  req: NextRequest,
  { params }: { params: { businessId: string } }
) {
  try {
    const businessId = params.businessId;
    const userId = "mock-user-id"; // Replace with real user ID session

    const count = await getUserCheckinCount(userId, businessId);
    const introOffer = await getBusinessIntroOffer(businessId);

    return NextResponse.json({
      hasCheckedInBefore: count > 0,
      introOffer,
    });
  } catch (error) {
    console.error("Intro offer error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
