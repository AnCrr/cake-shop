import "./scss/app.scss";
import React, { useState, createContext } from "react";

import Home from "./pages/Home";

import NotFound from "./pages/NotFound.jsx";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import FullCake from "./pages/FullCake";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="cake/:id" element={<FullCake />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
