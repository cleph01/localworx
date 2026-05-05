import Map from "@/app/components/maps/Map";
import LazyLoadWrapper from "@/app/components/ui/LazyLoadWrapper";

import type { FormData } from "./BusinessFormSection";

type MapSectionProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const MapSection = ({ formData, setFormData }: MapSectionProps) => {
  return (
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
            setFormData((prev: any) => ({
              ...prev,
              latitude: coords.lat,
              longitude: coords.lng,
            }));
          }}
        />
      </LazyLoadWrapper>
    </div>
  );
};

export default MapSection;
