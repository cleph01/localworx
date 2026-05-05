import { useEffect, useState } from "react";
import type { FormData } from "./BusinessFormSection";
import { fetchCategories } from "@/app/lib/business/create/formHelpers";

type CategorySelectProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const CategorySelect = ({ formData, setFormData }: CategorySelectProps) => {
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories(setCategoryOptions);
  }, []);

  return (
    <>
      <input
        name="category_id"
        placeholder="Category"
        list="category-list"
        value={formData.category_id}
        onChange={(e) =>
          setFormData((prev: FormData) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        className="w-full border p-2 rounded"
      />
      <datalist id="category-list">
        {categoryOptions.map((cat: string) => (
          <option key={cat} value={cat} />
        ))}
      </datalist>
    </>
  );
};

export default CategorySelect;
