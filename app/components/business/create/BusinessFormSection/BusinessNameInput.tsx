import type { FormData } from "./BusinessFormSection";

type BusinessNameInputProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const BusinessNameInput = ({
  formData,
  setFormData,
}: BusinessNameInputProps) => {
  return (
    <input
      name="business_name"
      placeholder="Business Name"
      value={formData.business_name}
      onChange={(e) =>
        setFormData((prev: FormData) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }))
      }
      required
      className="w-full border p-2 rounded"
    />
  );
};

export default BusinessNameInput;
