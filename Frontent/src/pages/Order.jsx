import { useState, useEffect } from "react";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
    console.log("Orders Fetched:", storedOrders); // Debugging Log
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-4 rounded-md shadow-md mb-4">
            <p className="font-semibold">Order ID: {order.id}</p>
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
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <span>{item.name} - ₹{item.price} x {item.quantity}</span>
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