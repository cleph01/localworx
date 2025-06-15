// components/maps/Map.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { initGoogleMaps } from "./initGoogle";

interface MapProps {
  center: { lat: number; lng: number };
  onMove?: (coords: { lat: number; lng: number }) => void;
}

export default function Map({ center, onMove }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (mapInitialized) return;

    const initializeMap = async () => {
      const maps = await initGoogleMaps(); // Now includes marker + maps

      if (!mapRef.current) return;

      const mapInstance = new maps.Map(mapRef.current, {
        center,
        zoom: 15,
        mapId: "DEMO_MAP_ID",
      });

      const marker = new maps.marker.AdvancedMarkerElement({
        position: center,
        map: mapInstance,
        gmpDraggable: true,
      });

      markerRef.current = marker;

      if (onMove) {
        marker.addListener("dragend", () => {
          const position = marker.position;
          if (position) {
            onMove({
              lat:
                typeof position.lat === "function"
                  ? position.lat()
                  : position.lat,
              lng:
                typeof position.lng === "function"
                  ? position.lng()
                  : position.lng,
            });
          }
        });
      }

      setMapInitialized(true);
    };

    initializeMap();
  }, [mapInitialized, center, onMove]);

  return (
    <div
      ref={mapRef}
      className="w-full h-80 rounded shadow bg-gray-100 relative"
    />
  );
}
