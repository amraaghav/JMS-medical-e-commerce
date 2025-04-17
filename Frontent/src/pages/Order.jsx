import { useEffect, useState } from "react";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("userToken"); // ✅

      if (!token) {
        setError("Please login to view your orders.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        setOrders(data);
      } catch (err) {
        console.error("Order fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading orders...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;
  if (orders.length === 0) return <div className="p-4 text-center">No orders found.</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Orders</h2>
      {orders.map((order, i) => (
        <div key={i} className="border p-4 rounded-md shadow-md mb-4">
          <h3 className="text-lg font-semibold mb-2">Order #{i + 1}</h3>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Payment:</strong> {order.paymentMethod}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <div className="mt-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 mb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p>{item.name}</p>
                  <p>Qty: {item.quantity} × ₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderPage;
