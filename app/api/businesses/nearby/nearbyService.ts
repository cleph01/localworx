import { LatLng, Business } from "./nearbyTypes";
import { getAllBusinesses } from "./nearbyDAO";
import { haversineDistance } from "../../lib/haversineDistance"; // Reuse your existing utility

const MAX_DISTANCE_METERS = 1000; // 1km for example

// This function retrieves all businesses and filters them based on
// the distance from the provided coordinates
export async function findNearbyBusinesses(
  coords: LatLng
): Promise<Business[]> {
  try {
    // Fetch all businesses from the database
    const allBusinesses = await getAllBusinesses();
    // Filter businesses based on the distance from the provided coordinates
    // using the haversine formula
    return allBusinesses.filter((business) => {
      const distance = haversineDistance(coords, {
        latitude: business.latitude,
        longitude: business.longitude,
      });
      // Check if the distance is within the maximum allowed distance
      // retunrns boolean value representing if the business is nearby
      return distance <= MAX_DISTANCE_METERS;
    });
  } catch (err) {
    console.error("Error in findNearbyBusinesses:", err);
    throw new Error("Unable to process nearby business search.");
  }
}
