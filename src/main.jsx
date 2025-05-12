import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/category/:categoryId" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </HashRouter>
    </CartProvider>
  </React.StrictMode>
);
