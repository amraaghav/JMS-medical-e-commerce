import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/orders/admin/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/orders/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border rounded-lg p-4 shadow-md"
            >
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-blue-700">
                  Order by: {order.customer || order.user?.email}
                </h3>
                <p className="text-sm text-gray-600">
                  Address: {order.address}
                </p>
                <p className="text-sm text-gray-600">
                  Payment: {order.payment}
                </p>
                <p className="text-sm text-gray-600">Method: {order.method}</p>
                <p className="text-sm text-gray-600">Date: {order.date}</p>
                <p className="text-sm text-gray-800 font-medium">
                  Status: {order.status}
                </p>
              </div>
              <div className="space-y-2">
                {Array.isArray(order.items) ? (
                  order.items.map((product, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 border-b pb-2"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {product.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          ₹{product.price}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-red-500">No items in this order</p>
                )}
              </div>

              <div className="mt-3 text-right text-lg font-bold text-green-600">
                Total: ₹{order.total}
              </div>

              <div className="mt-3 flex justify-between items-center">
                <div className="text-lg font-bold text-green-600">
                  Total: ₹{order.totalAmount || order.price}
                </div>

                <div className="flex gap-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value)
                    }
                    className="border px-2 py-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
