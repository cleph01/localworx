// components/maps/AddressAutocomplete.tsx
"use client";

import { useEffect, useRef } from "react";
import { initGoogleMaps } from "./initGoogle";

interface AddressAutocompleteProps {
  onSelect: (address: string, location: { lat: number; lng: number }) => void;
}

export default function AddressAutocomplete({
  onSelect,
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initializeAutocomplete = async () => {
      await initGoogleMaps();
      await google.maps.importLibrary("places");

      if (!inputRef.current) return;

      const autocomplete = new google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["geocode"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (
          !place.geometry ||
          !place.geometry.location ||
          !place.formatted_address
        )
          return;

        const location = place.geometry.location;
        onSelect(place.formatted_address, {
          lat: location.lat(),
          lng: location.lng(),
        });
      });
    };

    initializeAutocomplete();
  }, [onSelect]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Enter business address"
      className="w-full border px-4 py-2 rounded shadow-sm text-sm"
    />
  );
}
