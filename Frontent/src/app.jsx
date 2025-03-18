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
import About from "./pages/About";
import Contact from "./pages/Contact";

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
    <div className="flex flex-col min-h-screen"> {/* ✅ Full height container */}
      {!isAdminRoute && <Navbar />}
      
      <main className="flex-grow"> {/* ✅ Allows the main content to grow */}
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact/>}/>
          
          {/* Admin Panel */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPanel />} />
            <Route path="add-items" element={<AddItems />} />
            <Route path="list-items" element={<ListItems />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />} {/* ✅ Footer will always be at bottom */}
    </div>
  );
}

export default App;
