"use client";

import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { initGoogleMaps } from "./initGoogle";

export interface AddressAutocompleteHandle {
  clear: () => void;
}

interface Props {
  onSelect: (address: string, location: { lat: number; lng: number }) => void;
}

const AddressAutocomplete = forwardRef<AddressAutocompleteHandle, Props>(
  ({ onSelect }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // expose `clear()` to parent
    useImperativeHandle(ref, () => ({
      clear: () => {
        if (inputRef.current) inputRef.current.value = "";
      },
    }));

    useEffect(() => {
      const initialize = async () => {
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

          onSelect(place.formatted_address, {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        });
      };

      initialize();
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
);

export default AddressAutocomplete;
