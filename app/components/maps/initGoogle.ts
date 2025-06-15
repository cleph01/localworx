// lib/maps/initGoogle.ts
import { Loader } from "@googlemaps/js-api-loader";

export async function initGoogleMaps(): Promise<typeof google.maps> {
  if (typeof window === "undefined") {
    throw new Error("Google Maps can only be initialized in the browser");
  }

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    version: "weekly",
  });

  try {
    // ✅ Load the core Maps library (you can await others in parallel if needed)
    await Promise.all([
      loader.importLibrary("maps"),
      loader.importLibrary("places"),
      loader.importLibrary("marker"),
    ]);

    return google.maps;
  } catch (error) {
    console.error("Google Maps failed to load", error);
    throw error;
  }
}
