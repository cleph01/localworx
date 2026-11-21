"use client";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { Circle, MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";

const icon = L.divIcon({
  className: "",
  html: '<div style="width:26px;height:26px;border-radius:9999px;background:#f7931a;border:4px solid #0b1f36;box-shadow:0 2px 6px rgba(0,0,0,.35);cursor:grab"></div>',
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});

function Follow({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    if (!map.getBounds().pad(-0.2).contains([lat, lng])) map.setView([lat, lng], Math.max(map.getZoom(), 17));
  }, [lat, lng, map]);
  return null;
}

function ClickToMove({ onMove }: { onMove: (lat: number, lng: number) => void }) {
  useMapEvents({ click: (e) => onMove(e.latlng.lat, e.latlng.lng) });
  return null;
}

export default function PinPickerMap({ lat, lng, onMove, radius }: { lat: number; lng: number; onMove: (lat: number, lng: number) => void; radius?: number }) {
  return (
    <MapContainer center={[lat, lng]} zoom={radius && radius > 100 ? 16 : 18} scrollWheelZoom={false} className="h-64 w-full rounded-xl ring-1 ring-line">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      {radius && <Circle center={[lat, lng]} radius={radius} pathOptions={{ color: "#c96f06", weight: 2, fillColor: "#f7931a", fillOpacity: 0.12 }} />}
      <Marker position={[lat, lng]} icon={icon} draggable
        eventHandlers={{ dragend: (e) => { const p = (e.target as L.Marker).getLatLng(); onMove(p.lat, p.lng); } }} />
      <Follow lat={lat} lng={lng} />
      <ClickToMove onMove={onMove} />
    </MapContainer>
  );
}
