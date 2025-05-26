// utils/geocodeAddress.ts
export async function geocodeAddress(address: string) {
  const encoded = encodeURIComponent(address);
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );

  if (!res.ok) throw new Error("Failed to fetch geolocation");

  const data = await res.json();
  if (data.status !== "OK" || !data.results[0]) {
    throw new Error("No geolocation data found for this address");
  }

  const { lat, lng } = data.results[0].geometry.location;
  return { latitude: lat, longitude: lng };
}
