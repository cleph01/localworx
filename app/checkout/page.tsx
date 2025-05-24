"use client";
// app/checkout/page.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Checkout = () => {
  // to be able to programitcally change routes from a client component
  const router = useRouter();
  //
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    // Fetch the cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
    setTotalPrice(
      storedCart.reduce(
        (sum: number, item: { price: number }) => sum + item.price,
        0
      )
    );
  }, []);

  const handlePayment = () => {
    // Here you would integrate a payment system (e.g., a mock function for now)
    console.log("Processing payment...");
    alert("Payment successful!");
    // Clear cart after checkout
    localStorage.setItem("cart", JSON.stringify([]));
    router.push("/order-history"); // Redirect to Order History
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="bg-white shadow p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id}>
              <p>
                {item.title} - ${item.price}
              </p>
            </div>
          ))
        )}
        <div className="mt-4">
          <p className="text-xl font-semibold">Total Price: ${totalPrice}</p>
          <button
            onClick={handlePayment}
            className="bg-green-500 text-white px-6 py-2 rounded-md"
          >
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
