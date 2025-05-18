"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { haversineDistance } from "../../lib/haversine";
import Link from "next/link";

type Business = {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  distance?: number; // Optional for sorting
};

export default function BusinessListPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [radius, setRadius] = useState<number>(5); // miles

  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ latitude, longitude });
      },
      (err) => {
        toast.error("Failed to retrieve location.");
        console.error(err);
      }
    );
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    const fetchBusinesses = async () => {
      try {
        const res = await fetch("/api/businesses");
        if (!res.ok) throw new Error("Failed to fetch businesses");
        const data: Business[] = await res.json();

        const filtered = data
          .map((b) => {
            const distanceMeters = haversineDistance(userLocation, {
              latitude: b.latitude,
              longitude: b.longitude,
            });
            const distanceMiles = distanceMeters / 1609.34;
            return { ...b, distance: distanceMiles };
          })
          .filter((b) => b.distance <= radius)
          .sort((a, b) => a.distance - b.distance);

        setBusinesses(filtered);
      } catch (err) {
        toast.error("Failed to load business data");
        console.error(err);
      }
    };

    fetchBusinesses();
  }, [userLocation, radius]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Nearby Businesses</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Filter Radius (miles)
        </label>
        <select
          className="p-2 border rounded"
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value))}
        >
          {[1, 2, 5, 10, 25, 50].map((miles) => (
            <option key={miles} value={miles}>
              {miles} miles
            </option>
          ))}
        </select>
      </div>

      {businesses.length === 0 ? (
        <p>No businesses found within {radius} miles.</p>
      ) : (
        <ul className="space-y-4">
          {businesses.map((b) => (
            <li key={b.id} className="p-4 bg-white shadow rounded border">
              <h2 className="text-lg font-semibold">{b.name}</h2>
              <p className="text-gray-600">{b.description}</p>
              <p className="text-sm text-gray-500">
                Distance: {(b.distance ?? 0).toFixed(2)} miles
              </p>
              <Link
                href={`/business/${b.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
