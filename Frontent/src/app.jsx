import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./conponent/Navbar";
import Hero from "./conponent/Hero";

function app() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default app;
