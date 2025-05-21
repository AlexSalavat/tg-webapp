import React, { useState } from "react";

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

    const text = `🛒 <b>Новый заказ</b> №${newOrderId}\n\n👤 Имя: ${name}\n📱 Контакт: ${contact}\n🌆 Город: ${city}\n\n📦 Товары:\n${cart
      .map((item) => `- ${item.name} x${item.quantity} = ${item.price * item.quantity} ₽`)
      .join("\n")}\n\n💰 Сумма заказа: ${total} ₽\n📲 Канал связи: ${method === "whatsapp" ? "WhatsApp" : "Telegram"}`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" })
    })
      .then(() => alert(`✅ Заказ №${newOrderId} успешно отправлен! С вами свяжется менеджер.`))
      .catch(() => alert("❌ Ошибка при отправке заказа"));
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center px-4 py-8 space-y-5">
      <h2 className="text-2xl font-bold text-center">🛍 Подтверждение заказа</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ваше имя"
        className="w-full max-w-md p-3 rounded bg-neutral-800 text-white placeholder-gray-400"
      />

      <input
        type="text"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Ваш номер телефона"
        className="w-full max-w-md p-3 rounded bg-neutral-800 text-white placeholder-gray-400"
      />

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Ваш город"
        className="w-full max-w-md p-3 rounded bg-neutral-800 text-white placeholder-gray-400"
      />

      <div className="w-full max-w-md">
        <h3 className="text-sm mb-2">Способ связи с вами:</h3>
        <div className="flex rounded overflow-hidden border border-neutral-700">
          <button
            className={`w-1/2 py-2 font-semibold ${
              method === "whatsapp" ? "bg-green-600 text-white" : "bg-neutral-800 text-gray-400"
            }`}
            onClick={() => setMethod("whatsapp")}
          >
            🟢 WhatsApp
          </button>
          <button
            className={`w-1/2 py-2 font-semibold ${
              method === "telegram" ? "bg-blue-600 text-white" : "bg-neutral-800 text-gray-400"
            }`}
            onClick={() => setMethod("telegram")}
          >
            🔵 Telegram
          </button>
        </div>
      </div>

      {orderId && (
        <div className="text-green-400 text-center font-medium">
          📦 Ваш заказ №{orderId} успешно отправлен!
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full max-w-md py-3 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition"
      >
        ✅ Отправить заявку
      </button>

      <button
        onClick={onBack}
        className="w-full max-w-md py-2 bg-neutral-700 text-white rounded hover:bg-neutral-600"
      >
        ← Назад
      </button>
    </div>
  );
};

export default ConfirmPage;
