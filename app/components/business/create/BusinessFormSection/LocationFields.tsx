import type { FormData } from "./BusinessFormSection";

type LoactionFieldsProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const LocationFields = ({ formData, setFormData }: LoactionFieldsProps) => {
  return (
    <>
      <div className="flex gap-4">
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={(e) =>
            setFormData((prev: FormData) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          className="w-1/2 border p-2 rounded"
        />
        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={(e) =>
            setFormData((prev: FormData) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          className="w-1/4 border p-2 rounded"
        />
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
    </>
  );
};

export default LocationFields;
