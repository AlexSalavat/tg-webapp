// ✅ CartButton.jsx (в src/components/CartButton.jsx) — обновляется мгновенно
import React from 'react';
import { useCart } from '../context/AppContext';

const CartButton = ({ onClick }) => {
  const { cart } = useCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#17a2b8',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        fontSize: '20px',
        fontWeight: 'bold',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        zIndex: 1000,
        cursor: 'pointer'
      }}
    >
      🛒
      {totalQty > 0 && (
        <span style={{
          position: 'absolute',
          top: '-6px',
          right: '-6px',
          background: 'red',
          borderRadius: '50%',
          padding: '4px 6px',
          fontSize: '12px',
          fontWeight: 'bold',
          color: 'white'
        }}>
          {totalQty}
        </span>
      )}
    </button>
  );
};

export default CartButton;
