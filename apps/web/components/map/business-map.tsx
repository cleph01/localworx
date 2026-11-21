"use client";
import dynamic from "next/dynamic";

export type MapPin = { slug: string; name: string; lat: number; lng: number };

// Leaflet touches `window`, so it only loads in the browser.
const Inner = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-2xl bg-paper-2" />,
});

export function BusinessMap({ pins }: { pins: MapPin[] }) {
  return <Inner pins={pins} />;
}
