import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./conponent/Navbar";
import Hero from "./conponent/Hero";
import Profile from "./pages/Profile";
import Footer from "./conponent/Footer";
import AdminLayout from "./admin/AdminLayout";
import AdminPanel from "./admin/AdminPanel";
import AddItems from "./admin/AddItems";
import ListItems from "./admin/ListItems";
import Orders from "./admin/Orders";

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />} {/* Navbar केवल User Panel में दिखेगा */}
      <Routes>
        {/* User Panel */}
        <Route path="/" element={<Hero />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Admin Panel Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPanel />} />
          <Route path="add-items" element={<AddItems />} />
          <Route path="list-items" element={<ListItems />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />} {/* Footer भी User Panel के लिए */}
    </>
  );
}

export default App;
