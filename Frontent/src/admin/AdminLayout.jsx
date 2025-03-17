import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FiUsers, FiBox, FiShoppingCart, FiUser, FiLogOut, FiPlus, FiList } from "react-icons/fi";

const AdminLayout = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    // Add actual logout functionality here
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5 space-y-6">
        <h2 className="text-xl font-bold text-red-500">JMS Medical</h2>
        <span className="text-sm text-red-400">ADMIN PANEL</span>
        <nav className="mt-4">
          <Link to="/admin" className="flex items-center p-3 hover:bg-gray-700 rounded">
            Dashboard
          </Link>
          <Link to="/admin/add-items" className="flex items-center p-3 hover:bg-gray-700 rounded">
            <FiPlus className="mr-2" /> Add Items
          </Link>
          <Link to="/admin/list-items" className="flex items-center p-3 hover:bg-gray-700 rounded">
            <FiList className="mr-2" /> List Items
          </Link>
          <Link to="/admin/orders" className="flex items-center p-3 hover:bg-gray-700 rounded">
            <FiShoppingCart className="mr-2" /> Orders
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <div className="bg-white p-4 shadow flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          {/* Profile Dropdown */}
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
              <FiUser className="text-xl" />
              <span>Admin</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                <Link to="/admin/profile" className="flex items-center p-3 hover:bg-gray-200">
                  <FiUser className="mr-2" /> Profile
                </Link>
                <button onClick={handleLogout} className="flex items-center p-3 w-full text-left hover:bg-gray-200">
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Outlet for Admin Pages */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
