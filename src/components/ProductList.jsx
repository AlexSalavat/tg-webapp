import React from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

const ProductList = ({ categoryId, goBack }) => {
  const filteredProducts = products.filter((p) => p.categoryId === categoryId);

  return (
    <div className="p-4 font-sans bg-white min-h-screen">
      <button
        className="mb-4 text-blue-600 underline"
        onClick={goBack}
      >
        ← Назад к категориям
      </button>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Товары</h2>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">Нет товаров в этой категории.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
