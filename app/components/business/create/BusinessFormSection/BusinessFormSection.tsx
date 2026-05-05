"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AddressAutocomplete, {
  AddressAutocompleteHandle,
} from "../../../maps/AddressAutocomplete";

import { useNostrUser } from "@/app/context/NostrUserContext";
import { encrypt } from "@/app/lib/security/aesCrypto";

import {
  validateAutocompleteAddress,
  submitBusinessForm,
} from "@/app/lib/business/create/formHelpers";

// Components
import BusinessNameInput from "./BusinessNameInput";
import DescriptionInput from "./DescriptionInput";
import AutocompleteToggle from "./AutocompleteToggle";
import LocationFields from "./LocationFields";
import ContactFields from "./ContactFields";
import CategorySelect from "./CategorySelect";
import MapSection from "./MapSection";
import SubmitButtonSection from "./SubmitButtonSection";

// Types
export type FormData = {
  business_name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  email_verified: boolean;
  website: string;
  latitude: number;
  longitude: number;
  category_id: string;
  category_name: string;
};

// Main component
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
  const [showAutocomplete, setShowAutocomplete] = useState(true);

  const autocompleteRef = useRef<AddressAutocompleteHandle>(null);

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

      <BusinessNameInput formData={formData} setFormData={setFormData} />

      <DescriptionInput formData={formData} setFormData={setFormData} />

      {showAutocomplete ? (
        <AddressAutocomplete
          ref={autocompleteRef}
          onSelect={(address, location) =>
            validateAutocompleteAddress(address, location, setFormData)
          }
        />
      ) : (
        <input
          type="text"
          name="address"
          placeholder="Enter business address (manual)"
          value={formData.address}
          onChange={(e) =>
            setFormData((prev: FormData) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          className="w-full border px-4 py-2 rounded shadow-sm text-sm"
        />
      )}

      <AutocompleteToggle
        showAutocomplete={showAutocomplete}
        setShowAutocomplete={setShowAutocomplete}
      />

      <LocationFields formData={formData} setFormData={setFormData} />

      <ContactFields formData={formData} setFormData={setFormData} />

      <CategorySelect formData={formData} setFormData={setFormData} />

      <MapSection formData={formData} setFormData={setFormData} />

      <SubmitButtonSection
        isSubmitting={isSubmitting}
        disableSubmit={false}
        formData={formData}
        setFormData={setFormData}
        autocompleteRef={autocompleteRef}
      />
    </form>
  );
}
