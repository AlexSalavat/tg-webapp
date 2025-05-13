import React from 'react';
import { useCart } from '../context/AppContext';

const ConfirmPage = ({ onBack, onSubmit }) => {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '16px', background: '#111', color: 'white', minHeight: '100vh' }}>
      <button
        onClick={onBack}
        style={{ marginBottom: '16px', padding: '8px 16px', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '8px' }}
      >
        ← Назад
      </button>

      <h2>Подтверждение заказа</h2>
      {cart.map(item => (
        <div key={item.id} style={{ marginTop: '12px' }}>
          <strong>{item.name}</strong> — {item.quantity} шт. × {item.price} ₽
        </div>
      ))}
      <div style={{ marginTop: '16px', fontWeight: 'bold' }}>Итого: {total} ₽</div>

      <button
        onClick={onSubmit}
        style={{ marginTop: '24px', padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}
      >
        ✅ Отправить заказ
      </button>
    </div>
  );
};

export default ConfirmPage;
