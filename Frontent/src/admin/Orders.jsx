import React, { useState } from "react";

const Orders = () => {
  // Sample order data
  const [orders, setOrders] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/60",
      name: "Tulsi green tea",
      customer: "Raghav",
      address: "RK University, Rajkot, 360020",
      items: 2,
      method: "COD",
      payment: "Pending",
      date: "11/02/2025",
      price: "Rs 99",
      status: "Order Placed",
    },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Page</h2>

      <div className="bg-white border rounded-lg p-4 shadow-md">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex items-center gap-4">
              <img
                src={order.image}
                alt={order.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-semibold">{order.name}</h3>
                <p className="text-sm text-gray-600">{order.customer}</p>
                <p className="text-sm text-gray-600">{order.address}</p>
              </div>
            </div>

            <div className="text-sm">
              <p><strong>Items:</strong> {order.items}</p>
              <p><strong>Method:</strong> {order.method}</p>
              <p><strong>Payment:</strong> {order.payment}</p>
              <p><strong>Date:</strong> {order.date}</p>
            </div>

            <div className="text-lg font-semibold">{order.price}</div>

            <button className="px-4 py-1 border rounded bg-gray-100 hover:bg-gray-200">
              {order.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
