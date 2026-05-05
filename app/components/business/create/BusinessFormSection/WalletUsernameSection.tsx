"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Wallet = {
  id: string;
  username: string;
  balance?: number;
};

type WalletUsernameSectionProps = {
  formData: any;
  setFormData: (data: any) => void;
  walletUsername: string;
  setWalletUsername: (val: string) => void;
  createNewWallet: boolean;
  setCreateNewWallet: (val: boolean) => void;
  usernameAvailability: {
    available: boolean | null;
    loading: boolean;
    error?: any;
  };
  existingWallets: Wallet[];
  selectedExistingUsername: string;
  setSelectedExistingUsername: (username: string) => void;
};

const WalletUsernameSection = ({
  formData,
  setFormData,
  walletUsername,
  setWalletUsername,
  createNewWallet,
  setCreateNewWallet,
  usernameAvailability,
  existingWallets,
  selectedExistingUsername,
  setSelectedExistingUsername,
}: WalletUsernameSectionProps) => {
  const [usernameWasManuallyEdited, setUsernameWasManuallyEdited] =
    useState(false);
  const [initialBusinessName, setInitialBusinessName] = useState("");

  useEffect(() => {
    const normalized = formData.business_name
      .trim()
      .replace(/\s+/g, "_")
      .toLowerCase();

    if (!usernameWasManuallyEdited) {
      setWalletUsername(normalized);
      setFormData((prev: any) => ({ ...prev, wallet_username: normalized }));
    }

    if (
      initialBusinessName &&
      initialBusinessName !== formData.business_name &&
      usernameWasManuallyEdited
    ) {
      toast.warn(
        "Changing the business name won’t automatically update your custom wallet username."
      );
    }

    setInitialBusinessName(formData.business_name);
  }, [formData.business_name]);

  const handleWalletSelect = (username: string) => {
    setSelectedExistingUsername(username);
    setCreateNewWallet(false);
    setFormData((prev: any) => ({ ...prev, wallet_username: username }));
  };

  const handleUsernameChange = (val: string) => {
    setWalletUsername(val);
    setUsernameWasManuallyEdited(true);
    setFormData((prev: any) => ({ ...prev, wallet_username: val }));
  };

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4">💡 Lightning Wallet</h2>

      {existingWallets.length > 0 && (
        <div className="mb-4">
          <label className="block font-medium mb-1">Use Existing Wallet</label>
          <select
            value={selectedExistingUsername}
            onChange={(e) => handleWalletSelect(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select wallet...</option>
            {existingWallets.map((wallet) => (
              <option key={wallet.id} value={wallet.username}>
                {wallet.username}{" "}
                {wallet.balance ? `- ${wallet.balance} sats` : ""}
              </option>
            ))}
          </select>
        </div>
      )}

      <label className="inline-flex items-center mb-4">
        <input
          type="checkbox"
          checked={createNewWallet}
          onChange={() => {
            setCreateNewWallet(!createNewWallet);
            if (!createNewWallet) setSelectedExistingUsername("");
          }}
          className="mr-2"
        />
        Create a new wallet for this business
      </label>

      {createNewWallet && (
        <div className="mt-4">
          <label className="block font-medium mb-1">Wallet Username</label>
          <input
            type="text"
            value={walletUsername}
            onChange={(e) => handleUsernameChange(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="e.g., blue_ridge_books"
          />
          {usernameAvailability.loading && (
            <p className="text-sm text-gray-500">Checking availability...</p>
          )}
          {usernameAvailability.available === false && (
            <p className="text-sm text-red-600">❌ Username already taken</p>
          )}
          {usernameAvailability.available === true && (
            <p className="text-sm text-green-600">✅ Username available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletUsernameSection;
