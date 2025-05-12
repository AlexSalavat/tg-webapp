import React from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border p-2 rounded">
      <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2" />
      <div className="font-bold">{product.name}</div>
      <div>{product.price} ₽</div>
      <button
        className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
        onClick={() => addToCart(product, 1)}
      >
        Добавить
      </button>
    </div>
  );
};

export default ProductCard;
