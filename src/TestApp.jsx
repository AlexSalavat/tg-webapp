import React, { useEffect } from "react";

const TelegramWebAppTest = () => {
  useEffect(() => {
    console.log("🧪 WebApp тест начат");

    if (window?.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      console.log("✅ Telegram WebApp обнаружен");

      const platform = window.Telegram.WebApp.platform;
      alert("PLATFORM: " + platform);
      console.log("PLATFORM:", platform);

      if (window.Telegram.WebApp.sendData) {
        alert("✅ sendData доступен — отправляем test payload");
        window.Telegram.WebApp.sendData(
          JSON.stringify({ test: true, timestamp: new Date().toISOString() })
        );
      } else {
        alert("❌ sendData НЕ доступен");
        console.warn("sendData is not available");
      }
    } else {
      alert("❌ window.Telegram.WebApp не найден");
      console.error("Telegram.WebApp not found");
    }
  }, []);

  return (
    <div className="p-4 text-white min-h-screen flex flex-col justify-center items-center bg-black">
      <h1 className="text-2xl font-bold mb-4">🧪 Telegram WebApp Test</h1>
      <p className="text-center text-base text-gray-400">
        Этот тест проверяет доступность Telegram WebApp API и `sendData()`.
      </p>
    </div>
  );
};

export default TelegramWebAppTest;
