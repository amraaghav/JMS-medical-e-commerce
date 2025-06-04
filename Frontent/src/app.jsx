import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./conponent/Navbar";
import Hero from "./conponent/Hero";
import Profile from "./pages/Profile";
import Footer from "./conponent/Footer";
import AdminLayout from "./admin/AdminLayout";
import AdminPanel from "./admin/AdminPanel";
import AddItems from "./admin/AddItems";
import ListItems from "./admin/ListItems";
import AdminLogin from "./admin/AdminLogin";
import Orders from "./admin/Orders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductGallery from "./pages/ProductGallery";
import ProductDetails from "./pages/ProductDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import OrderPage from "./pages/Order";
import OrderDetails from "./pages/OrderDetails";
import MedicalHelp from "./pages/Help";
import ProtectedRoute from "./routes/ProtectedRoute";
import Logout from "./pages/Logout";
import AddressForm from "./pages/AddressForm"; 


function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("userToken"));

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setAuth(!!token);
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout auth={auth} setAuth={setAuth} />
      </BrowserRouter>
    </Provider>
  );
}


function MainLayout({ auth, setAuth })  {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      {!isAdminRoute && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product" element={<ProductGallery />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/help" element={<MedicalHelp />} />
          <Route path="/address" element={<AddressForm />} />
          <Route path="/orders" element={<OrderPage />} />


          {/* 🔒 Protected User Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orderpage" element={<OrderPage />} />
            <Route path="/order-details" element={<OrderDetails />} />
            <Route path="/logout" element={<Logout />} />
           
          </Route>

          {/* 🔒 Admin Panel Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedAdminRoutes />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminPanel />} />
              <Route path="add-items" element={<AddItems />} />
              <Route path="list-items" element={<ListItems />} />
              <Route path="orders" element={<Orders />} />
              
              
            </Route>
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

const ProtectedAdminRoutes = () => {
  const adminToken = localStorage.getItem("adminToken");
  return adminToken ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default App;
