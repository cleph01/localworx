import { toast } from "react-toastify";
import { getCurrentLocation } from "./geoLocationHelper";
import { reverseGeocode } from "./reverseGeocode";

import stateCodes from "./stateCodes";

// Handle form input changes
export function handleFormInputChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setFormData: React.Dispatch<React.SetStateAction<any>>
) {
  const { name, value } = e.target;

  setFormData((prev: FormData) => ({ ...prev, [name]: value }));
}

// Fetch business categories from the API
export interface Category {
  id?: string;
  name: string;
}

export type SetCategoryOptions = React.Dispatch<React.SetStateAction<string[]>>;

export async function fetchCategories(
  setCategoryOptions: SetCategoryOptions
): Promise<void> {
  try {
    const res = await fetch("/api/business-categories");
    const data: Category[] = await res.json();
    setCategoryOptions(data.map((cat: Category) => cat.name));
  } catch (err) {
    console.error("Failed to fetch categories", err);
    toast.error("Failed to load categories. Please try again later.");
  }
}

// Handle "Use My Location" button click
export async function handleUseMyLocation(
  setFormData: React.Dispatch<React.SetStateAction<any>>,
  autocompleteRef?: React.RefObject<any>
) {
  try {
    setFormData((prev: any) => ({
      ...prev,
      business_name: "",
      description: "",
      address: "",
      city: "",
      state: "",
      phone: "",
      email: "",
      email_verified: false,
      website: "",
      latitude: 0,
      longitude: 0,
      category_id: "",
      category_name: "",
    }));

    autocompleteRef?.current?.clear();

    const coords = await getCurrentLocation();
    const { latitude, longitude } = coords;
    const addressInfo = await reverseGeocode(latitude, longitude);

    setFormData((prev: any) => ({
      ...prev,
      latitude,
      longitude,
      ...addressInfo,
    }));

    toast.success("📍 Location captured and address auto-filled!");
  } catch {
    toast.error("Failed to get location. Please enter it manually.");
  }
}

// Validate and set the address from the autocomplete input
export function validateAutocompleteAddress(
  fullAddress: string,
  location: { lat: number; lng: number },

  setFormData: React.Dispatch<React.SetStateAction<any>>
) {
  const parts = fullAddress.split(",").map((s) => s.trim());

  console.log("Full address:", fullAddress);
  // Attempt to extract from the tail of the string
  const streetRaw = parts[0];
  const cityRaw = parts[1] || "";
  const [stateRaw, zipRaw] = parts[2].split(" ") || "";

  // Normalize state to match stateCodes list
  const stateNormalized = stateRaw.toUpperCase();

  console.log("Street raw:", streetRaw);
  console.log("City raw:", cityRaw);
  console.log("State raw:", stateRaw);
  console.log("State normalized:", stateNormalized);
  console.log("Zip raw:", zipRaw);

  const isValidState = Object.values(stateCodes)
    .map((s) => s.toUpperCase())
    .includes(stateNormalized);

  if (!isValidState) {
    toast.error(`⚠️ Invalid state code: "${stateRaw}"`);
    return;
  }

  setFormData((prev: FormData) => ({
    ...prev,
    address: streetRaw,
    city: cityRaw,
    state: stateNormalized,
    latitude: location.lat,
    longitude: location.lng,
  }));
}

// Handle form submission
export async function submitBusinessForm(
  e: React.FormEvent,
  user: { id: string } | null,
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>,
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  encrypt: (input: string) => string,
  router: { push: (path: string) => void }
) {
  e.preventDefault();

  if (!user) {
    toast.error("User not authenticated.");
    return;
  }

  setIsSubmitting(true);
  try {
    const walletRes = await fetch("/api/lightning/wallet/create-subwallet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: formData.business_name }),
    });

    const walletData = await walletRes.json();
    if (!walletRes.ok || !walletData?.pairingUri)
      throw new Error("Wallet creation failed");

    const encryptedPairingUri = encrypt(walletData.pairingUri);

    if (!encryptedPairingUri) {
      throw new Error("Failed to encrypt pairing URI");
    }
    // Prepare payload for business creation
    const payload = {
      ...formData,
      owner_id: user.id,
      category_id: formData.category_id || null,
      wallet_id: walletData.username,
      pairing_uri_encrypted: encryptedPairingUri,
      wallet_created: true,
    };

    const bizRes = await fetch("/api/business/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!bizRes.ok) throw new Error("Failed to save business");

    toast.success("🎉 Business created and wallet linked!");
    router.push("/dashboard");
  } catch (err) {
    console.error("Error in handleSubmit:", err);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
}
