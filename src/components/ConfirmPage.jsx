// ✅ ConfirmPage.jsx — отладка sendData и WebApp API
import React, { useEffect } from 'react';

const ConfirmPage = ({ onBack }) => {
  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      console.log("[WEBAPP] Корзина перед отправкой:", cart);

      if (window?.Telegram?.WebApp?.sendData) {
        console.log("[WEBAPP] sendData вызывается");
        window.Telegram.WebApp.sendData(JSON.stringify({ items: cart }));
      } else {
        console.warn("[WEBAPP] sendData НЕ доступна");
      }

      if (window?.Telegram?.WebApp?.close) {
        console.log("[WEBAPP] Закрытие WebApp");
        window.Telegram.WebApp.close();
      }
    } catch (e) {
      console.error('[WEBAPP] Ошибка WebApp API:', e);
    }
  }, []);

  return (
    <div style={{
      padding: '24px',
      background: '#111',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h2 style={{ marginBottom: '12px', textAlign: 'center' }}>🛍 Заказ принят!</h2>
      <p style={{ textAlign: 'center', fontSize: '15px', color: '#ccc' }}>
        Ваш заказ уже собирается. Мы свяжемся с вами в ближайшее время!
      </p>
      <button
        onClick={onBack}
        style={{
          marginTop: '24px',
          padding: '10px 20px',
          backgroundColor: '#444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        ← Вернуться
      </button>
    </div>
  );
};

export default ConfirmPage;
