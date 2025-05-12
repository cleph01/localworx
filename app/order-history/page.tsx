// app/order-history/page.tsx
import { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // Fetch order history (for now, simulate this data)
    const storedOrders = JSON.parse(
      localStorage.getItem("orderHistory") || "[]"
    );
    setOrders(storedOrders);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={index} className="mb-4">
              <p>
                {order.itemName} - ${order.price}
              </p>
              <p>Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
