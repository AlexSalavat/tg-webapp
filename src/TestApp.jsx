import React, { useEffect } from "react";

const TelegramWebAppTest = () => {
  useEffect(() => {
    const check = () => {
      if (window?.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        const platform = window.Telegram.WebApp.platform;
        alert("✅ Telegram WebApp загружен\nPLATFORM: " + platform);
        if (window.Telegram.WebApp.sendData) {
          alert("✅ sendData доступен");
          window.Telegram.WebApp.sendData(
            JSON.stringify({ test: true, timestamp: new Date().toISOString() })
          );
        } else {
          alert("❌ sendData НЕ доступен");
        }
      } else {
        console.log("⏳ Telegram.WebApp не найден, ждём...");
        setTimeout(check, 300);
      }
    };

    check();
  }, []);

  return (
    <div className="p-4 text-white min-h-screen flex flex-col justify-center items-center bg-black">
      <h1 className="text-2xl font-bold mb-4">🧪 Telegram WebApp Test</h1>
      <p className="text-center text-base text-gray-400">
        Ждём появления Telegram WebApp API...
      </p>
    </div>
  );
};

export default TelegramWebAppTest;
