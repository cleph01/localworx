import { handleUseMyLocation } from "@/app/lib/business/create/formHelpers";

import type { FormData } from "./BusinessFormSection";
import { AddressAutocompleteHandle } from "@/app/components/maps/AddressAutocomplete";

type SubmitButtonSectionProps = {
  isSubmitting: boolean;
  disableSubmit: boolean;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  autocompleteRef?: React.RefObject<AddressAutocompleteHandle | null>;
};

const SubmitButtonSection = ({
  isSubmitting,
  disableSubmit,
  formData,
  setFormData,
  autocompleteRef,
}: SubmitButtonSectionProps) => {
  return (
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
        disabled={isSubmitting || disableSubmit}
        className={`w-1/2 py-3 font-bold rounded ${
          disableSubmit
            ? "bg-gray-400 text-white"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {!isSubmitting ? "✅ Submit" : "Submitting... please wait"}
      </button>
    </div>
  );
};

export default SubmitButtonSection;
