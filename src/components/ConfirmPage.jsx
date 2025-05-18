import React, { useEffect } from 'react';

const ConfirmPage = ({ onBack }) => {
  useEffect(() => {
    console.log("ConfirmPage loaded");

    if (window?.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
    }

    const timer = setTimeout(() => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        console.log("[WebApp] cart:", cart);
        alert("📦 Попытка отправки заказа...");

        console.log("Telegram WebApp:", window.Telegram?.WebApp);

        // 👉 Добавлено для отладки платформы
        console.log("PLATFORM:", window.Telegram?.WebApp?.platform);
        alert("PLATFORM: " + window.Telegram?.WebApp?.platform);

        if (window?.Telegram?.WebApp?.sendData) {
          alert("✅ sendData доступен — отправка заказа");
          window.Telegram.WebApp.sendData(JSON.stringify({ items: cart }));
        } else {
          alert("⛔ sendData НЕ доступен — не через Telegram WebApp");
        }

        if (window?.Telegram?.WebApp?.close) {
          window.Telegram.WebApp.close();
        }
      } catch (e) {
        console.error("[ConfirmPage] Ошибка при отправке:", e);
        alert("❌ Ошибка ConfirmPage: " + e.message);
      }
    }, 300);

    return () => clearTimeout(timer);
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
      <h2 style={{ marginBottom: '12px', textAlign: 'center' }}>🛍 Заявка отправлена!</h2>
      <p style={{ textAlign: 'center', fontSize: '15px', color: '#ccc' }}>
        Мы получили вашу заявку и скоро с вами свяжемся 💬
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
        ← Назад в каталог
      </button>
    </div>
  );
};

export default ConfirmPage;
