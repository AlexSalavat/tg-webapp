// ✅ ConfirmPage.jsx — отправка заказа в Telegram + сообщение
import React, { useEffect } from 'react';
import { useCart } from '../context/AppContext';

const ConfirmPage = ({ onBack }) => {
  const { cart, clearCart } = useCart();

  useEffect(() => {
    const tg = window.Telegram.WebApp;

    const items = cart.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    tg.sendData(JSON.stringify({ items }));
    clearCart();
    tg.close();
  }, []);

  return (
    <div style={{ padding: '16px', background: '#111', color: 'white', minHeight: '100vh' }}>
      <h2>🎁 Заказ собирается!</h2>
      <p style={{ marginTop: '12px' }}>Мы уже начали комплектовать ваш заказ. Наш менеджер свяжется с вами в Telegram в ближайшее время 💬</p>
      <button
        onClick={onBack}
        style={{
          marginTop: '24px',
          padding: '10px 20px',
          background: '#f4c2c2',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        ← Вернуться в магазин
      </button>
    </div>
  );
};

export default ConfirmPage;
