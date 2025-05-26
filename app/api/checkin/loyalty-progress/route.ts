// app/api/checkin/loyalty-progress/[businessId]/route.ts

import { NextRequest, NextResponse } from "next/server";

// 🔧 Mock DB query functions (replace with real DB calls)
async function getBusinessById(businessId: string) {
  return {
    id: businessId,
    loyaltyThreshold: 5,
    rewardDescription: "Free Coffee After 5 Visits",
  };
}

async function getUserCheckinsForBusiness(userId: string, businessId: string) {
  return 3; // Example: 3 past check-ins
}

export async function GET(
  req: NextRequest,
  { params }: { params: { businessId: string } }
) {
  try {
    const businessId = params.businessId;
    const userId = "mock-user-id"; // Replace with session-derived user ID

    const business = await getBusinessById(businessId);
    if (!business) {
      return NextResponse.json(
        { message: "Business not found." },
        { status: 404 }
      );
    }

    const checkins = await getUserCheckinsForBusiness(userId, businessId);

    return NextResponse.json({
      checkins,
      threshold: business.loyaltyThreshold,
      rewardDescription: business.rewardDescription,
    });
  } catch (error) {
    console.error("Loyalty progress error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
