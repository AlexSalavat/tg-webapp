// ✅ ConfirmPage.jsx — WebApp sendData
import React, { useEffect } from 'react';

const ConfirmPage = ({ onBack }) => {
  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      if (window?.Telegram?.WebApp?.sendData) {
        window.Telegram.WebApp.sendData(JSON.stringify({ items: cart }));
      }

      if (window?.Telegram?.WebApp?.close) {
        window.Telegram.WebApp.close();
      }
    } catch (e) {
      console.error("[ConfirmPage] Ошибка sendData:", e);
    }
  }, []);

  return (
    <div style={{ padding: '24px', background: '#111', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2 style={{ marginBottom: '12px', textAlign: 'center' }}>🛍 Заявка принята!</h2>
      <p style={{ textAlign: 'center', fontSize: '15px', color: '#ccc' }}>
        Мы уже получили ваш заказ и скоро свяжемся 🫶
      </p>
      <button
        onClick={onBack}
        style={{ marginTop: '24px', padding: '10px 20px', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        ← Назад
      </button>
    </div>
  );
};

export default ConfirmPage;
