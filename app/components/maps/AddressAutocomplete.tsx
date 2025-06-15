"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { initGoogleMaps } from "./initGoogle";

export interface AddressAutocompleteHandle {
  clear: () => void;
}

interface Props {
  onSelect: (address: string, location: { lat: number; lng: number }) => void;
}

const AddressAutocomplete = forwardRef<AddressAutocompleteHandle, Props>(
  ({ onSelect }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const autocompleteRef = useRef<HTMLElement | null>(null); // Reference to the Google element

    // Expose clear() to parent
    useImperativeHandle(ref, () => ({
      clear: () => {
        if (
          autocompleteRef.current &&
          "value" in autocompleteRef.current &&
          typeof autocompleteRef.current["value"] === "string"
        ) {
          (autocompleteRef.current as any).value = "";
        }
      },
    }));

    const initialize = useCallback(async () => {
      const maps = await initGoogleMaps();

      const element = new maps.places.PlaceAutocompleteElement({
        // Optional: you can set locationRestriction, types, etc.
        // locationRestriction: { west: ..., east: ..., north: ..., south: ... }
      });

      element.id = "place-autocomplete-input";

      element.addEventListener("gmp-place-select", async (event: any) => {
        const place = event.place;
        await place.fetchFields({
          fields: ["formattedAddress", "location"],
        });

        if (place.formattedAddress && place.location) {
          onSelect(place.formattedAddress, {
            lat: place.location.lat,
            lng: place.location.lng,
          });
        }
      });

      if (containerRef.current) {
        containerRef.current.innerHTML = ""; // Clear prior children
        containerRef.current.appendChild(element);
        autocompleteRef.current = element;
      }
    }, [onSelect]);

    useEffect(() => {
      initialize();
    }, [initialize]);

    return (
      <div
        ref={containerRef}
        className="w-full border px-4 py-2 rounded shadow-sm text-sm"
      />
    );
  }
);

export default AddressAutocomplete;
