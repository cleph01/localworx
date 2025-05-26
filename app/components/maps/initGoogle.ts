// lib/maps/initGoogle.ts
export function initGoogleMaps(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject("Not in browser");

    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector(
      'script[src^="https://maps.googleapis.com/maps/api/js"]'
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", (e) => reject(e));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,marker,maps`;
    script.async = true;
    script.defer = true;

    script.onload = () => resolve();
    script.onerror = (e) => reject(e);

    document.head.appendChild(script);
  });
}
