import type { FormData } from "./BusinessFormSection";

type ContactFieldsProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const ContactFields = ({ formData, setFormData }: ContactFieldsProps) => {
  return (
    <>
      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) =>
          setFormData((prev: FormData) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        className="w-full border p-2 rounded"
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev: FormData) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        className="w-full border p-2 rounded"
      />
      <input
        name="website"
        placeholder="Website"
        value={formData.website}
        onChange={(e) =>
          setFormData((prev: FormData) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        className="w-full border p-2 rounded"
      />
    </>
  );
};

export default ContactFields;
