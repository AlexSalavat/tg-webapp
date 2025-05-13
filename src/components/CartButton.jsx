// ✅ CartButton.jsx — иконка корзины с количеством
import React from 'react';
import { useCart } from '../context/AppContext';

const CartButton = ({ onClick }) => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (totalItems === 0) return null;

  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        top: 12,
        right: 12,
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '999px',
        padding: '10px 16px',
        fontSize: '14px',
        fontWeight: 'bold',
        zIndex: 999,
        boxShadow: '0 0 6px rgba(0,0,0,0.3)',
        cursor: 'pointer'
      }}
    >
      🛒 {totalItems}
    </button>
  );
};

export default CartButton;