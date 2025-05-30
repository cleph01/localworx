// components/business/BusinessFormSection.tsx

"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddressAutocomplete from "../../maps/AddressAutocomplete";
import Map from "../../maps/Map";
import { getCurrentLocation } from "../../../lib/business/geoLocationHelper";
import { reverseGeocode } from "../../../lib/business/reverseGeocode";
import LazyLoadWrapper from "../../ui/LazyLoadWrapper";
import PairingNoticeModal from "./PairingNoticeModal";

// add useEffect to pull npub from localStorage

export default function BusinessFormSection() {
  const [formData, setFormData] = useState({
    owner_id: "",
    business_name: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    email_verified: false,
    website: "",
    description: "",
    latitude: 34.8526, // default: Greenville, SC
    longitude: -82.394,
    category_id: "",
    category_name: "",
  });

  // Hold the NWC wallet pairingUri
  const [pairingUri, setPairingUri] = useState("");
  const [showPairing, setShowPairing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Hold Business Category Options
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Step 0: If category_id is set in FormData, then category should be blank
      if (formData.category_id) {
        setFormData({
          ...formData,
          category_name: "",
        });
      }
      // Step 1: Create business (eventually via real API)
      console.log("Submitted business:", formData);
      toast.success("✅ Business submitted (mock only)");

      // Step 2: Create Lightning subwallet
      const response = await fetch("/api/lightning/wallet/create-subwallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: formData.business_name,
          type: "business",
          ownerPubkey: localStorage.getItem("npub"),
        }),
      });

      const data = await response.json();

      // Console CreateNewBusiness Response
      console.log("created New Business @ BusinessFormSection: ", data);

      if (data.pairingUri) {
        toast.success("🪙 Subwallet created for this business!");
        setPairingUri(data.pairingUri);
        setShowPairing(true);
      } else {
        toast.error("Failed to create subwallet");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during registration.");
    }
  };

  /**
   * useEffect to fetch UserId
   */

  useEffect(() => {
    async function fetchOwnerId() {
      const npub = localStorage.getItem("npub");
      if (!npub) return;

      try {
        const res = await fetch(`/api/users/by-npub/${npub}`);

        const user = await res.json();
        if (user?.id) {
          setFormData((prev) => ({ ...prev, owner_id: user.id }));
        }
      } catch (error) {
        console.error("Failed to fetch owner ID", error);
      }
    }

    fetchOwnerId();
  }, []);

  // useEffect to fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/business-categories");
        const data = await res.json();
        setCategoryOptions(data.map((cat: { name: string }) => cat.name));
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    }

    fetchCategories();
  }, []);

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
        value={formData.business_name}
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

      {/* TODO: Ensure either a category_id or category_name is passed but not both */}
      <input
        type="text"
        name="category"
        placeholder="Category"
        list="category-list"
        value={formData.category_id}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <datalist id="category-list">
        {categoryOptions.map((cat) => (
          <option key={cat} value={cat} />
        ))}
      </datalist>

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
        {showModal && (
          <PairingNoticeModal
            pairingUri={pairingUri}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </form>
  );
}
