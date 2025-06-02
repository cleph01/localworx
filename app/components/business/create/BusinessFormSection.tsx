"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AddressAutocomplete, {
  AddressAutocompleteHandle,
} from "../../maps/AddressAutocomplete";
import Map from "../../maps/Map";
import { getCurrentLocation } from "../../../lib/business/geoLocationHelper";
import { reverseGeocode } from "../../../lib/business/reverseGeocode";
import LazyLoadWrapper from "../../ui/LazyLoadWrapper";

import { useNostrUser } from "@/app/context/NostrUserContext";
import { encrypt } from "@/app/lib/security/aesCrypto";

import stateCodes from "@/app/lib/business/stateCodes";

export default function BusinessFormSection() {
  const { user } = useNostrUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    business_name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    email_verified: false,
    website: "",
    latitude: 34.8526,
    longitude: -82.394,
    category_id: "",
    category_name: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

  const autocompleteRef = useRef<AddressAutocompleteHandle>(null);

  // Show/hide autocomplete field based on location usage
  const [showAutocomplete, setShowAutocomplete] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/business-categories");
        const data = await res.json();
        setCategoryOptions(data.map((cat: { name: string }) => cat.name));
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUseMyLocation = async () => {
    try {
      setFormData((prev) => ({
        ...prev,
        business_name: "",
        description: "",
        address: "",
        city: "",
        state: "",
        phone: "",
        email: "",
        email_verified: false,
        website: "",
        latitude: 0,
        longitude: 0,
        category_id: "",
        category_name: "",
      }));

      // 👇 Clear the autocomplete field visually
      autocompleteRef.current?.clear();

      const coords = await getCurrentLocation();
      const { latitude, longitude } = coords;
      const addressInfo = await reverseGeocode(latitude, longitude);
      console.log("Reverse geocoded address info:", addressInfo);
      setFormData((prev) => ({ ...prev, latitude, longitude, ...addressInfo }));
      toast.success("📍 Location captured and address auto-filled!");
    } catch {
      toast.error("Failed to get location. Please enter it manually.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("User not authenticated.");
      return;
    }

    // Validate State Code
    const stateKey = formData.state.trim().toLowerCase().replace(/\s+/g, "_");

    if (
      !(stateKey in stateCodes) ||
      !Object.values(stateCodes)
        .map((stateAbb) => stateAbb.toUpperCase())
        .includes(stateKey.toUpperCase())
    ) {
      toast.error("Invalid state code. Please use a valid state abbreviation.");
      return;
    }

    setIsSubmitting(true);
    try {
      const walletRes = await fetch("/api/wallets/create-subwallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: formData.business_name }),
      });

      const walletData = await walletRes.json();
      if (!walletRes.ok || !walletData?.pairingUri)
        throw new Error("Wallet creation failed");

      const encryptedPairingUri = encrypt(walletData.pairingUri);

      // Split address into components
      const [address, city, state] = formData.address
        .split(",")
        .map((s) => s.trim());
      // Handle cases where address might not have city/state
      setFormData((prev) => ({
        ...prev,
        address,
        city: city || formData.city,
        state: state || formData.state,
      }));
      // Prepare payload for business creation
      const payload = {
        ...formData,
        owner_id: user.id,
        category_id: formData.category_id || null,
        wallet_id: walletData.username,
        pairing_uri_encrypted: encryptedPairingUri,
        wallet_created: true,
      };

      const bizRes = await fetch("/api/business/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!bizRes.ok) throw new Error("Failed to save business");

      toast.success("🎉 Business created and wallet linked!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("BusinessFormSection rendered with formData:", formData);
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-3xl mx-auto space-y-6"
    >
      <h1 className="text-2xl font-bold">📍 Register Your Business</h1>

      <input
        name="business_name"
        placeholder="Business Name"
        value={formData.business_name}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <textarea
        name="description"
        placeholder="Business Description"
        value={formData.description}
        onChange={handleChange}
        rows={3}
        className="w-full border p-2 rounded"
      />

      {showAutocomplete ? (
        <AddressAutocomplete
          ref={autocompleteRef}
          onSelect={(address, location) => {
            setFormData((prev) => ({
              ...prev,
              address,
              latitude: location.lat,
              longitude: location.lng,
            }));
          }}
        />
      ) : (
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-gray-100"
        />
      )}
      <input
        type="checkbox"
        checked={showAutocomplete}
        onChange={(e) => setShowAutocomplete(e.target.checked)}
      />

      <div className="flex gap-4">
        <input
          readOnly
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          className="w-1/2 border p-2 rounded bg-gray-100"
        />
        <input
          readOnly
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          className="w-1/2 border p-2 rounded bg-gray-100"
        />
      </div>

      <div className="flex gap-4">
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-1/2 border p-2 rounded"
        />
        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="w-1/4 border p-2 rounded"
        />
      </div>

      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="website"
        placeholder="Website"
        value={formData.website}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="category_id"
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
            onMove={(coords) => {
              setFormData((prev) => ({
                ...prev,
                latitude: coords.lat,
                longitude: coords.lng,
              }));
            }}
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
          disabled={isSubmitting}
          className="w-1/2 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded"
        >
          ✅ Submit
        </button>
      </div>
    </form>
  );
}
