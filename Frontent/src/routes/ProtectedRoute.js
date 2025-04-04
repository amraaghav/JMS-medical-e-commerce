import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userToken = localStorage.getItem("userToken"); // Check if the user is logged in
  return userToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
