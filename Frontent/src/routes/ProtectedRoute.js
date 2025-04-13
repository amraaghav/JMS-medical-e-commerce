// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("userToken");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
