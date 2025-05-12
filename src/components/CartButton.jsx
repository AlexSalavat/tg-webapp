import React from "react";
import { useCart } from "../context/CartContext";

const CartButton = ({ onClick }) => {
  const { cart } = useCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg relative"
    >
      🛒
      {totalCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          {totalCount}
        </span>
      )}
    </button>
  );
};

export default CartButton;
