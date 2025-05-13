"use client";
// app/promoter/page.tsx
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createMarketplaceItemService } from "../api/marketplace/marketplaceService";

const PromoterPage = () => {
  const { data: session, status } = useSession();
  const [itemDetails, setItemDetails] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      // Redirect to login page if not logged in
      router.push("/auth/signin");
      return;
    }

    // try {
    //   const result = await createMarketplaceItemService({
    //     ...itemDetails,
    //     price: parseFloat(itemDetails.price), // Convert price to a number
    //     user_id: session?.user?.id || "", // Assuming session.user.id contains the user ID
    //   });
    //   console.log(result);
    //   // Handle success (e.g., show a success message, redirect, etc.)
    // } catch (error) {
    //   console.error("Error Creating New Item", error);
    //   return <div>Error Creating New Items</div>; // Handle error gracefully
    // }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create a New Promotion</h1>
      {session ? (
        <form onSubmit={() => handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={itemDetails.title}
            onChange={handleInputChange}
            className="input"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={itemDetails.description}
            onChange={handleInputChange}
            className="input"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={itemDetails.price}
            onChange={handleInputChange}
            className="input"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={itemDetails.category}
            onChange={handleInputChange}
            className="input"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded"
          >
            Submit Promotion
          </button>
        </form>
      ) : (
        <p>Please log in to create a promotion.</p>
      )}
    </div>
  );
};

export default PromoterPage;
