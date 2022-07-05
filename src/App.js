import "./scss/app.scss";
import React, { useState, createContext } from "react";

import Home from "./pages/Home";
import Header from "./components/Header";
import NotFound from "./pages/NotFound.jsx";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
