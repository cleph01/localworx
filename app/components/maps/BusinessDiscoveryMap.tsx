"use client";

import { useEffect, useRef, useState } from "react";
import { initGoogleMaps } from "./initGoogle";

interface Business {
  id: number | string;
  business_name: string;
  category_name?: string;
  latitude: number;
  longitude: number;
}

interface BusinessDiscoveryMapProps {
  businesses: Business[];
  defaultCenter?: { lat: number; lng: number };
}

const FALLBACK_CENTER = { lat: 37.7749, lng: -122.4194 };

export default function BusinessDiscoveryMap({
  businesses,
  defaultCenter,
}: BusinessDiscoveryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const mapsApiRef = useRef<typeof google.maps | null>(null);
  const [mapReady, setMapReady] = useState(false);

  // Initialize map once
  useEffect(() => {
    if (!mapRef.current) return;
    let cancelled = false;

    const init = async () => {
      const maps = await initGoogleMaps();
      if (cancelled || !mapRef.current) return;

      mapsApiRef.current = maps;
      mapInstanceRef.current = new maps.Map(mapRef.current, {
        center: defaultCenter ?? FALLBACK_CENTER,
        zoom: 12,
        mapId: "DEMO_MAP_ID",
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
      });
      infoWindowRef.current = new maps.InfoWindow();
      setMapReady(true);
    };

    init();
    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update markers whenever businesses or mapReady changes
  useEffect(() => {
    const maps = mapsApiRef.current;
    const mapInstance = mapInstanceRef.current;
    if (!mapReady || !maps || !mapInstance) return;

    // Remove old markers
    markersRef.current.forEach((m) => (m.map = null));
    markersRef.current = [];

    const valid = businesses.filter((b) => {
      const lat = Number(b.latitude);
      const lng = Number(b.longitude);
      return lat && lng && !isNaN(lat) && !isNaN(lng);
    });

    if (valid.length === 0) return;

    const bounds = new maps.LatLngBounds();

    for (const business of valid) {
      const position = { lat: Number(business.latitude), lng: Number(business.longitude) };
      bounds.extend(position);

      const pin = document.createElement("div");
      pin.style.cssText =
        "background:#1a2e4a;color:#fff;font-size:11px;font-weight:700;padding:3px 8px;border-radius:999px;box-shadow:0 1px 4px rgba(0,0,0,.3);cursor:pointer;white-space:nowrap";
      pin.textContent = business.business_name;

      const marker = new maps.marker.AdvancedMarkerElement({
        position,
        map: mapInstance,
        content: pin,
        title: business.business_name,
      });

      marker.addListener("click", () => {
        if (!infoWindowRef.current) return;
        infoWindowRef.current.setContent(`
          <div style="font-family:sans-serif;padding:4px 2px;min-width:160px">
            <p style="font-weight:700;font-size:14px;margin:0 0 2px">${business.business_name}</p>
            ${business.category_name ? `<p style="font-size:12px;color:#6b7280;margin:0 0 6px">${business.category_name}</p>` : ""}
            <a href="/services-directory/${business.id}" style="font-size:12px;color:#2563eb;text-decoration:underline">View details →</a>
          </div>
        `);
        infoWindowRef.current.open({ anchor: marker, map: mapInstance });
      });

      markersRef.current.push(marker);
    }

    if (valid.length === 1) {
      mapInstance.setCenter(bounds.getCenter());
      mapInstance.setZoom(14);
    } else {
      mapInstance.fitBounds(bounds, 60);
    }
  }, [businesses, mapReady]);

  return (
    <div
      ref={mapRef}
      className="w-full rounded-xl shadow-md bg-gray-100"
      style={{ height: "420px" }}
    />
  );
}
