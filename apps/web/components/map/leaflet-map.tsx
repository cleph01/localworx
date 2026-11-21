"use client";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { MapPin } from "./business-map";

const pin = L.divIcon({
  className: "",
  html: '<div style="width:18px;height:18px;border-radius:9999px;background:#f7931a;border:3px solid #0b1f36"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export default function LeafletMap({ pins }: { pins: MapPin[] }) {
  const center: [number, number] = pins.length ? [pins[0].lat, pins[0].lng] : [41.0018, -73.6657];
  const bounds = pins.length > 1 ? L.latLngBounds(pins.map((p) => [p.lat, p.lng])) : undefined;
  return (
    <MapContainer center={center} zoom={14} bounds={bounds} boundsOptions={{ padding: [32, 32] }}
      scrollWheelZoom={false} className="h-full w-full rounded-2xl">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pins.map((p) => (
        <Marker key={p.slug} position={[p.lat, p.lng]} icon={pin}>
          <Popup><a href={`/b/${p.slug}`} style={{ fontWeight: 600 }}>{p.name}</a></Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
