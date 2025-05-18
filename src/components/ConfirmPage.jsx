import React, { useEffect } from "react";

const ConfirmPage = ({ onBack }) => {
  useEffect(() => {
    console.log("🧪 ConfirmPage loaded");

    try {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        console.log("✅ WebApp.ready()");

        const platform = window.Telegram.WebApp.platform;
        console.log("📱 PLATFORM:", platform);
        alert("PLATFORM: " + platform);

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        console.log("[WebApp] cart:", cart);
        alert("📦 Попытка отправки заказа...");

        setTimeout(() => {
          if (window.Telegram?.WebApp?.sendData) {
            console.log("✅ sendData доступен");
            alert("✅ sendData доступен — отправляем заказ");
            window.Telegram.WebApp.sendData(JSON.stringify({ items: cart }));
          } else {
            console.warn("❌ sendData НЕ доступен");
            alert("❌ sendData НЕ доступен");
          }

          if (window.Telegram?.WebApp?.close) {
            window.Telegram.WebApp.close();
          }
        }, 300);
      } else {
        console.error("❌ Telegram.WebApp не найден");
        alert("❌ Telegram WebApp не найден");
      }
    } catch (e) {
      console.error("[ConfirmPage] Ошибка:", e);
      alert("❌ Ошибка ConfirmPage: " + e.message);
    }
  }, []);

  return (
    <div
      style={{
        padding: "24px",
        background: "#111",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 style={{ marginBottom: "12px", textAlign: "center" }}>
        🛍 Заявка отправлена!
      </h2>
      <p style={{ textAlign: "center", fontSize: "15px", color: "#ccc" }}>
        Мы получили вашу заявку и скоро с вами свяжемся 💬
      </p>
      <button
        onClick={onBack}
        style={{
          marginTop: "24px",
          padding: "10px 20px",
          backgroundColor: "#444",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ← Назад в каталог
      </button>
    </div>
  );
};

export default ConfirmPage;
