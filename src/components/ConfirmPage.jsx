import React, { useEffect, useState } from "react";

const ConfirmPage = ({ cart, onBack }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [method, setMethod] = useState("whatsapp");
  const [orderId, setOrderId] = useState(null);
  const BOT_TOKEN = "7334255719:AAHbh1FToqydNAWb-iA-oYTHJzN7Ms0oNts";
  const CHAT_ID = "2037548370";

  const handleSubmit = () => {
    if (!name || !contact || !city) {
      alert("Пожалуйста, заполните имя, контакт и город");
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrderId = Date.now();
    setOrderId(newOrderId);
    const text = `🛒 <b>Новый заказ</b> №${newOrderId}

👤 Имя: ${name}
📱 Контакт: ${contact}
🌆 Город: ${city}

📦 Товары:
${cart
      .map(
        (item) => `- ${item.name} x${item.quantity} = ${item.price * item.quantity} ₽`
      )
      .join("\n")}

💰 Сумма заказа: ${total} ₽
📲 Канал связи: ${method === "whatsapp" ? "WhatsApp" : "Telegram"}`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" })
    })
      .then(() => alert(`✅ Заказ №${newOrderId} успешно отправлен! С вами свяжется менеджер.`))
      .catch(() => alert("❌ Ошибка при отправке заказа"));
  };

  return (
    <div className="p-6 bg-[#111] min-h-screen flex flex-col justify-center items-center space-y-4">
      <h2 style={{ color: 'white' }} className="text-xl font-bold drop-shadow-sm shadow-white">🛍 Подтверждение заказа</h2>

      <div className="w-full max-w-xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xl">👤</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            className="flex-1 p-3 text-lg rounded bg-[#222] text-white placeholder-gray-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xl">📞</span>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Номер телефона"
            className="flex-1 p-3 text-lg rounded bg-[#222] text-white placeholder-gray-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xl">🌍</span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Город"
            className="flex-1 p-3 text-lg rounded bg-[#222] text-white placeholder-gray-400"
          />
        </div>
      </div>

      <div className="w-full max-w-xs">
        <h3 style={{ color: 'white' }} className="text-base font-semibold mt-4 mb-2 drop-shadow-sm shadow-white">Способ связи с вами:</h3>
        <div className="flex bg-[#222] rounded overflow-hidden text-sm font-medium">
          <button
            className={`px-4 py-2 w-1/2 ${method === "whatsapp" ? 'bg-green-600 text-white' : 'text-gray-300'}`}
            onClick={() => setMethod("whatsapp")}
          >
            🟢 WhatsApp
          </button>
          <button
            className={`px-4 py-2 w-1/2 ${method === "telegram" ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
            onClick={() => setMethod("telegram")}
          >
            🔵 Telegram
          </button>
        </div>
      </div>

      {orderId && (
        <div className="mt-2 text-green-400 font-semibold text-center">
          📦 Ваш заказ <span className="text-white">№{orderId}</span> успешно отправлен! Ожидайте сообщение от менеджера.
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-green-600 rounded text-white font-bold transition-transform hover:scale-105 active:scale-95"
      >
        ✅ Отправить заявку
      </button>

      <button
        onClick={onBack}
        className="mt-2 px-4 py-1 bg-gray-700 rounded text-white"
      >
        ← Назад
      </button>
    </div>
  );
};

export default ConfirmPage;
