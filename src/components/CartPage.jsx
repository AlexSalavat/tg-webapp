// ✅ CartPage.jsx — экран корзины с подсчётом и редактированием
import React from 'react';
import { useCart } from '../context/AppContext';

const CartPage = ({ onBack }) => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '16px', background: '#111', color: 'white', minHeight: '100vh' }}>
      <button
        onClick={onBack}
        style={{ marginBottom: '16px', padding: '8px 16px', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
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
                <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>–</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 'auto', color: 'red' }}>Удалить</button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: '16px', fontWeight: 'bold' }}>Итого: {total} ₽</div>
          <button
            onClick={() => alert('Оформление пока не реализовано')}
            style={{ marginTop: '16px', padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ✅ Оформить заказ
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
