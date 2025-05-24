"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const AddWalletForm = () => {
  const [wallet, setWallet] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    toast.success("Wallet updated!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
      <label htmlFor="wallet" className="text-sm font-medium text-gray-700">
        Add or update your Lightning wallet
      </label>
      <input
        type="text"
        id="wallet"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        placeholder="lnbc1..."
        className="border rounded px-4 py-2 text-sm"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded font-semibold text-sm hover:bg-blue-700"
      >
        Save Wallet
      </button>
    </form>
  );
};

export default AddWalletForm;
