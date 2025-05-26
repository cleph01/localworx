// app/api/checkin/validate-location/route.ts

import { NextRequest, NextResponse } from "next/server";

// Import your existing haversine function
import { haversineDistance } from "../../lib/haversineDistance";

// Mock: Replace with real business fetching logic
async function getBusinessCoordinates(businessId: string) {
  // In production, query DB
  const mockBusiness = {
    id: businessId,
    latitude: 34.8526, // Example: Greenville, SC
    longitude: -82.394,
  };

  return mockBusiness;
}

export async function POST(req: NextRequest) {
  try {
    const { businessId, userLocation } = await req.json();

    if (!businessId || !userLocation?.latitude || !userLocation?.longitude) {
      return NextResponse.json(
        { message: "Invalid payload." },
        { status: 400 }
      );
    }

    const business = await getBusinessCoordinates(businessId);

    if (!business) {
      return NextResponse.json(
        { message: "Business not found." },
        { status: 404 }
      );
    }

    const distance = haversineDistance(
      { latitude: userLocation.latitude, longitude: userLocation.longitude },
      { latitude: business.latitude, longitude: business.longitude }
    );

    const maxDistance = 50; // meters (adjust as needed)

    if (distance > maxDistance) {
      return NextResponse.json(
        { message: `Too far from business (${Math.round(distance)}m away).` },
        { status: 403 }
      );
    }

    // TODO: Record check-in to database (mocked here)
    console.log(`✅ Check-in success for user at business ${businessId}`);

    return NextResponse.json({ success: true, message: "Check-in recorded!" });
  } catch (error) {
    console.error("Check-in error:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
