// ✅ CartPage.jsx — фикс: кнопка "Оформить заказ" с жёстким цветом и выравниванием
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/AppContext';

const CartPage = ({ onBack, onConfirm }) => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    setRenderKey(prev => prev + 1);
  }, [cart]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div key={renderKey} style={{ padding: '16px', background: '#111', color: 'white', minHeight: '100vh' }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: '16px',
          padding: '8px 16px',
          backgroundColor: '#444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        ← Назад
      </button>

      <h2 style={{ marginBottom: '16px' }}>Корзина</h2>

      {cart.length === 0 ? (
        <p>🛒 Ваша корзина пуста</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} style={{ marginBottom: '16px', background: '#222', padding: '12px', borderRadius: '12px' }}>
              <div style={{ fontWeight: 'bold' }}>{item.name}</div>
              <div style={{ fontSize: '13px', margin: '4px 0' }}>{item.price} ₽ × {item.quantity}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={() => {
                  updateQuantity(item.id, Math.max(1, item.quantity - 1));
                  setRenderKey(k => k + 1);
                }}>–</button>
                <span>{item.quantity}</span>
                <button onClick={() => {
                  updateQuantity(item.id, item.quantity + 1);
                  setRenderKey(k => k + 1);
                }}>+</button>
                <button onClick={() => {
                  removeFromCart(item.id);
                  setRenderKey(k => k + 1);
                }} style={{ marginLeft: 'auto', color: 'red' }}>Удалить</button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '16px', fontWeight: 'bold' }}>Итого: {total} ₽</div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => {
                if (onConfirm) onConfirm();
              }}
              style={{
                marginTop: '24px',
                padding: '14px 28px',
                backgroundColor: '#00C853', // жёсткий зелёный
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              🛍 Оформить заявку
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
