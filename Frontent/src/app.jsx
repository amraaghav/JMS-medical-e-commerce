import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./conponent/Navbar";
import Hero from "./conponent/Hero";
import Profile from "./pages/Profile";
import Footer from "./conponent/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Footer /> {/* Footer is shown on this route */}
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Profile />
              {/* Footer is NOT included here */}
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
