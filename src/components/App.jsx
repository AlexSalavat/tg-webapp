import React, { useState } from "react";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import Cart from "./Cart";
import CartButton from "./CartButton";

export default function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [view, setView] = useState("catalog");

  return (
    <div className="p-4">
      {view === "cart" ? (
        <Cart />
      ) : selectedCategoryId ? (
        <ProductList
          categoryId={selectedCategoryId}
          goBack={() => setSelectedCategoryId(null)}
        />
      ) : (
        <CategoryList setSelectedCategoryId={setSelectedCategoryId} />
      )}

      <CartButton onClick={() => setView(view === "cart" ? "catalog" : "cart")} />
    </div>
  );
}
