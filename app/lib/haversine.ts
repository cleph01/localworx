type Coordinates = {
  latitude: number;
  longitude: number;
};

export function haversineDistance(
  coord1: Coordinates,
  coord2: Coordinates
): number {
  const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

  const R = 6371000; // meters
  const dLat = toRadians(coord2.latitude - coord1.latitude);
  const dLon = toRadians(coord2.longitude - coord1.longitude);

  const lat1 = toRadians(coord1.latitude);
  const lat2 = toRadians(coord2.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
