import { useEffect, useState } from "react";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Get the token from localStorage or sessionStorage
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("User is not logged in");
        }

        const res = await fetch("http://localhost:5000/api/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data); // Set fetched orders
        setLoading(false); // Set loading to false after fetching
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
        setLoading(false);
      }
    };

    fetchOrders(); // Fetch orders on page load
  }, []); // Empty dependency array to ensure the effect runs only once

  // Handling loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 rounded-md shadow-md mb-4">
            <p className="font-semibold">Order ID: {order._id}</p>
            <p className="text-gray-500">Status: {order.status}</p>
            <p className="text-gray-500">Total: ₹{order.total.toFixed(2)}</p>
            <p className="text-gray-500">Name: {order.user.name}</p>
            <p className="text-gray-500">Address: {order.user.address}</p>
            <p className="text-gray-500">Phone: {order.user.phone}</p>
            <p className="text-gray-500">Payment: {order.user.paymentMethod}</p>

            <h3 className="font-semibold mt-2">Ordered Items:</h3>
            <ul>
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center space-x-4">
                  <img
                    src={`http://localhost:5000/uploads/${item.image.split("/").pop()}`}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <span>
                    {item.name} - ₹{item.price} x {item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderPage;
