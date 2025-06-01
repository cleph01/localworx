// components/business/BusinessFormSection.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AddressAutocomplete from "../../maps/AddressAutocomplete";
import Map from "../../maps/Map";
import { getCurrentLocation } from "../../../lib/business/geoLocationHelper";
import { reverseGeocode } from "../../../lib/business/reverseGeocode";
import LazyLoadWrapper from "../../ui/LazyLoadWrapper";
import PairingNoticeModal from "./PairingNoticeModal";
import { useNostrUser } from "@/app/context/NostrUserContext";
import { encrypt } from "@/app/lib/security/aesCrypto";

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
  // State to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Use Next.js router for navigation

  const router = useRouter();

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

    if (!user) {
      toast.error("User not authenticated.");
      return;
    }

    try {
      setIsSubmitting(true);

      // 1. Request subwallet creation from your backend
      const walletRes = await fetch("/api/wallets/create-subwallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.business_name, // or user.npub or a sanitized slug
        }),
      });

      const walletData = await walletRes.json();

      if (!walletRes.ok || !walletData?.pairingUri) {
        throw new Error("Wallet creation failed");
      }

      const encryptedPairingUri = encrypt(walletData.pairingUri);

      // 2. Construct business payload with wallet info
      const businessPayload = {
        business_name: formData.business_name,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        phone: formData.phone,
        email: formData.email,
        email_verified: false,
        website: formData.website,
        latitude: formData.latitude,
        longitude: formData.longitude,
        owner_id: formData.owner_id,
        category_id: formData.category_id || null,
        wallet_id: walletData.username, // same as passed into the service
        pairing_uri_encrypted: encryptedPairingUri,
        wallet_created: true,
      };

      // 3. Send to business creation API
      const bizRes = await fetch("/api/business/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(businessPayload),
      });

      if (!bizRes.ok) {
        throw new Error("Failed to save business");
      }

      toast.success("🎉 Business created and wallet linked!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * useEffect to fetch UserId
   */

  const { user } = useNostrUser();

  useEffect(() => {
    if (!user?.npub) return;

    async function fetchOwnerId() {
      try {
        const res = await fetch(`/api/users/by-npub/${user?.npub}`);

        const userDb = await res.json();

        console.log("local user @ businessForm: ", userDb);
        if (userDb?.id) {
          setFormData((prev) => ({ ...prev, owner_id: userDb?.id }));
        }
      } catch (error) {
        console.error("Failed to fetch owner ID", error);
      }
    }

    fetchOwnerId();
  }, [user]);

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
