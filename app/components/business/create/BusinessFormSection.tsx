// components/business/BusinessFormSection.tsx

"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import AddressAutocomplete from "../../maps/AddressAutocomplete";
import Map from "../../maps/Map";
import { getCurrentLocation } from "../../../lib/business/geoLocationHelper";
import { reverseGeocode } from "../../../lib/business/reverseGeocode";
import LazyLoadWrapper from "../../ui/LazyLoadWrapper";

export default function BusinessFormSection() {
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    website: "",
    latitude: 34.8526, // default: Greenville, SC
    longitude: -82.394,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUseMyLocation = async () => {
    try {
      const coords = await getCurrentLocation();
      const { latitude, longitude } = coords;

      const addressInfo = await reverseGeocode(latitude, longitude);

      setFormData((prev) => ({
        ...prev,
        latitude,
        longitude,
        ...addressInfo,
      }));

      toast.success("📍 Location captured and address auto-filled!");
    } catch (err) {
      toast.error("Failed to get location. Please enter it manually.");
    }
  };

  const handlePlaceSelected = (
    address: string,
    location: { lat: number; lng: number }
  ) => {
    setFormData({
      ...formData,
      address: address || "",
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  const handleMarkerDrag = (coords: { lat: number; lng: number }) => {
    setFormData({
      ...formData,
      latitude: coords.lat,
      longitude: coords.lng,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted business:", formData);
    toast.success("✅ Business submitted (mock only)");
    // TODO: mockFetch("/api/businesses", { method: "POST", body: formData })
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-3xl mx-auto space-y-6"
    >
      <h1 className="text-2xl font-bold">📍 Register Your Business</h1>

      <input
        type="text"
        name="businessName"
        placeholder="Business Name"
        value={formData.businessName}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Business Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows={3}
      />

      <AddressAutocomplete onSelect={handlePlaceSelected} />

      <div className="flex gap-4">
        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          readOnly
          className="w-1/2 border p-2 rounded bg-gray-100"
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          readOnly
          className="w-1/2 border p-2 rounded bg-gray-100"
        />
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-1/2 border p-2 rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="w-1/4 border p-2 rounded"
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP"
          value={formData.zip}
          onChange={handleChange}
          className="w-1/4 border p-2 rounded"
        />
      </div>

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="url"
        name="website"
        placeholder="Website"
        value={formData.website}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      {/* Map Section */}
      <div>
        <label className="block font-semibold mb-1">Adjust Pin on Map</label>
        <LazyLoadWrapper
          fallback={
            <p className="text-center text-sm text-gray-400">Loading map...</p>
          }
          delayMs={300}
          timeoutMs={4000}
        >
          <Map
            center={{ lat: formData.latitude, lng: formData.longitude }}
            onMove={handleMarkerDrag}
          />
        </LazyLoadWrapper>
      </div>

      <div className="flex justify-between gap-4 pt-4">
        <button
          type="button"
          onClick={handleUseMyLocation}
          className="w-1/2 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
        >
          📍 Use My Location
        </button>
        <button
          type="submit"
          className="w-1/2 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded"
        >
          ✅ Submit
        </button>
      </div>
    </form>
  );
}
