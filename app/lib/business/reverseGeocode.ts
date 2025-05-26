const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

export const reverseGeocode = async (
  lat: number,
  lng: number
): Promise<{
  address: string;
  city: string;
  state: string;
  zip: string;
}> => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;

  const res = await fetch(url);
  const json = await res.json();

  if (json.status !== "OK") {
    throw new Error("Failed to reverse geocode");
  }

  const components = json.results[0].address_components;
  const get = (type: string) =>
    components.find((c: any) => c.types.includes(type))?.long_name || "";

  return {
    address: `${get("street_number")} ${get("route")}`,
    city: get("locality"),
    state: get("administrative_area_level_1"),
    zip: get("postal_code"),
  };
};
