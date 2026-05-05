import type { FormData } from "./BusinessFormSection";

type DescriptionInputProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const DescriptionInput = ({ formData, setFormData }: DescriptionInputProps) => {
  return (
    <textarea
      name="description"
      placeholder="Business Description"
      value={formData.description}
      onChange={(e) =>
        setFormData((prev: FormData) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }))
      }
      rows={3}
      className="w-full border p-2 rounded"
    />
  );
};

export default DescriptionInput;
