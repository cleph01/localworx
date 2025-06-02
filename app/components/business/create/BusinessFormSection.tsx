"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AddressAutocomplete, {
  AddressAutocompleteHandle,
} from "../../maps/AddressAutocomplete";
import Map from "../../maps/Map";
import LazyLoadWrapper from "../../ui/LazyLoadWrapper";

import { useNostrUser } from "@/app/context/NostrUserContext";
import { encrypt } from "@/app/lib/security/aesCrypto";

import {
  fetchCategories,
  handleFormInputChange,
  handleUseMyLocation,
  validateAutocompleteAddress,
  submitBusinessForm,
} from "@/app/lib/business/create/formHelpers";

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
  const [showAutocomplete, setShowAutocomplete] = useState(true);

  const autocompleteRef = useRef<AddressAutocompleteHandle>(null);

  useEffect(() => {
    fetchCategories(setCategoryOptions);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitBusinessForm(
      e,
      user,
      formData,
      setFormData,
      setIsSubmitting,
      encrypt,
      router
    );
  };

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
        onChange={(e) => handleFormInputChange(e, setFormData)}
        required
        className="w-full border p-2 rounded"
      />
      <textarea
        name="description"
        placeholder="Business Description"
        value={formData.description}
        onChange={(e) => handleFormInputChange(e, setFormData)}
        rows={3}
        className="w-full border p-2 rounded"
      />

      {showAutocomplete ? (
        <AddressAutocomplete
          ref={autocompleteRef}
          onSelect={(address, location) =>
            validateAutocompleteAddress(
              address,
              location,

              setFormData
            )
          }
        />
      ) : (
        <input
          type="text"
          name="address"
          placeholder="Enter business address (manual)"
          value={formData.address}
          onChange={(e) => handleFormInputChange(e, setFormData)}
          className="w-full border px-4 py-2 rounded shadow-sm text-sm"
        />
      )}
      <div>
        <label className="inline-flex items-center text-gray-400 text-sm font-semibold">
          <input
            type="checkbox"
            checked={showAutocomplete}
            onChange={(e) => setShowAutocomplete(e.target.checked)}
            className="mr-2"
          />
          Use Address Autocomplete
        </label>
      </div>

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
          onChange={(e) => handleFormInputChange(e, setFormData)}
          className="w-1/2 border p-2 rounded"
        />
        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={(e) => handleFormInputChange(e, setFormData)}
          className="w-1/4 border p-2 rounded"
        />
      </div>

      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => handleFormInputChange(e, setFormData)}
        className="w-full border p-2 rounded"
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => handleFormInputChange(e, setFormData)}
        className="w-full border p-2 rounded"
      />
      <input
        name="website"
        placeholder="Website"
        value={formData.website}
        onChange={(e) => handleFormInputChange(e, setFormData)}
        className="w-full border p-2 rounded"
      />

      <input
        name="category_id"
        placeholder="Category"
        list="category-list"
        value={formData.category_id}
        onChange={(e) => handleFormInputChange(e, setFormData)}
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
          onClick={() => handleUseMyLocation(setFormData, autocompleteRef)}
          className="w-1/2 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
        >
          📍 Use My Location
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-1/2 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded"
        >
          {!isSubmitting ? "✅ Submit" : "Submitting... please wait"}
        </button>
      </div>
    </form>
  );
}
