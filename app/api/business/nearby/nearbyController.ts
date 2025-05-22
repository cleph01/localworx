import { NextRequest, NextResponse } from "next/server";
import { findNearbyBusinesses } from "./nearbyService";

export async function getNearbyBusinessesHandler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const lat = parseFloat(searchParams.get("lat") || "");
    const lng = parseFloat(searchParams.get("lng") || "");

    if (isNaN(lat) || isNaN(lng)) {
      return NextResponse.json(
        { error: "Invalid or missing lat/lng query parameters." },
        { status: 400 }
      );
    }

    const businesses = await findNearbyBusinesses({
      latitude: lat,
      longitude: lng,
    });

    return NextResponse.json(businesses, { status: 200 });
  } catch (err) {
    console.error("Error in getNearbyBusinessesHandler:", err);
    return NextResponse.json(
      {
        error: "Internal server error while searching for nearby businesses.",
      },
      { status: 500 }
    );
  }
}

// Pagination example (commented out for now)
/*
export async function getNearbyBusinessesHandler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const lat = parseFloat(searchParams.get("lat") || "");
    const lng = parseFloat(searchParams.get("lng") || "");

    if (isNaN(lat) || isNaN(lng)) {
      return NextResponse.json(
        { error: "Invalid or missing lat/lng query parameters." },
        { status: 400 }
      );
    }

    // Optional: read pagination params
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * pageSize;

    const allNearby = await findNearbyBusinesses({
      latitude: lat,
      longitude: lng,
    });

    const paginated = allNearby.slice(offset, offset + pageSize);

    return NextResponse.json(
      {
        data: paginated,
        meta: {
          page,
          limit: pageSize,
          total: allNearby.length,
          totalPages: Math.ceil(allNearby.length / pageSize),
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in getNearbyBusinessesHandler:", err);
    return NextResponse.json(
      {
        error: "Internal server error while searching for nearby businesses.",
      },
      { status: 500 }
    );
  }
}

*/
