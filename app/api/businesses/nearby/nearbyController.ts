import { findNearbyBusinesses } from "./nearbyService";
import { LatLng } from "./nearbyTypes";

export async function handleNearbyRequest(params: URLSearchParams) {
  try {
    // Extract latitude and longitude from query parameters
    const lat = parseFloat(params.get("lat") || "");
    const lng = parseFloat(params.get("lng") || "");

    // Validate latitude and longitude
    if (isNaN(lat) || isNaN(lng)) {
      return {
        status: 400,
        body: { error: "Invalid or missing lat/lng query parameters" },
      };
    }
    // Validate that lat and lng are within the acceptable range
    const nearby = await findNearbyBusinesses({
      latitude: lat,
      longitude: lng,
    });
    return {
      status: 200,
      body: nearby,
    };
  } catch (err) {
    console.error("Controller Error:", err);
    return {
      status: 500,
      body: {
        error: "Internal server error while searching for nearby businesses.",
      },
    };
  }
}
