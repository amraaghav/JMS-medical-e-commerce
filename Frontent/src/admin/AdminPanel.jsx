import React from "react";
import { FiPlus, FiList, FiShoppingCart } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const AdminPanel = () => {
  // Sample Data for Line Graph
  const orderData = [
    { name: "Jan", orders: 20 },
    { name: "Feb", orders: 30 },
    { name: "Mar", orders: 50 },
    { name: "Apr", orders: 40 },
    { name: "May", orders: 60 },
    { name: "Jun", orders: 80 },
  ];

  // Sample Data for Pie Chart
  const pieData = [
    { name: "Add Items", value: 50 },
    { name: "List Items", value: 120 },
    { name: "Orders", value: 30 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-500 text-white text-center rounded-lg shadow-md">
          <FiPlus className="text-3xl mx-auto mb-2" />
          <h2 className="text-xl font-bold">Total Add Items</h2>
          <p className="text-2xl">50</p>
        </div>
        <div className="p-4 bg-green-500 text-white text-center rounded-lg shadow-md">
          <FiList className="text-3xl mx-auto mb-2" />
          <h2 className="text-xl font-bold">Total List Items</h2>
          <p className="text-2xl">120</p>
        </div>
        <div className="p-4 bg-red-500 text-white text-center rounded-lg shadow-md">
          <FiShoppingCart className="text-3xl mx-auto mb-2" />
          <h2 className="text-xl font-bold">Total Orders</h2>
          <p className="text-2xl">30</p>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Line Chart */}
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4">Orders Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4">Item Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
