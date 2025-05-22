import { LatLng, Business } from "./nearbyTypes";
import { getAllBusinesses } from "./nearbyDAO";
import { haversineDistance } from "../../lib/haversineDistance";

const MAX_DISTANCE_METERS = 1000;

// This function finds nearby businesses within a specified distance from the given coordinates.
// It uses the Haversine formula to calculate distances between two points on the Earth.
// Sorted by distance, it returns an array of businesses that are within the specified distance.
export async function findNearbyBusinesses(
  coords: LatLng
): Promise<Business[]> {
  try {
    const allBusinesses = await getAllBusinesses();

    // Create tuples of [business, distance]
    const nearbyWithDistance = allBusinesses
      .map((business) => {
        const distance = haversineDistance(coords, {
          latitude: business.latitude,
          longitude: business.longitude,
        });
        return { business, distance };
      })
      .filter(({ distance }) => distance <= MAX_DISTANCE_METERS)
      .sort((a, b) => a.distance - b.distance); // Sort ascending by distance

    // Return only the business objects, not the distances
    return nearbyWithDistance.map(({ business }) => business);
  } catch (err) {
    console.error("Error in findNearbyBusinesses:", err);
    throw new Error("Unable to process nearby business search.");
  }
}
