import React, { useEffect, useState } from "react";

const ConfirmPage = ({ cart, onBack }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [method, setMethod] = useState("whatsapp");
  const BOT_TOKEN = "7334255719:AAHbh1FToqydNAWb-iA-oYTHJzN7Ms0oNts";
  const CHAT_ID = "2037548370"; // Telegram ID Александра

  const handleSubmit = () => {
    if (!name || !contact || !city) {
      alert("Пожалуйста, заполните имя, контакт и город");
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const text = `\n🛒 Новый заказ!\n👤 Имя: ${name}\n📱 Контакт: ${contact}\n🌆 Город: ${city}\n\n📦 Товары:\n${cart
      .map(
        (item) => `- ${item.name} x${item.quantity} = ${item.price * item.quantity} ₽`
      )
      .join("\n")}\n\n💰 Сумма заказа: ${total} ₽\n📲 Канал связи: ${method === "whatsapp" ? "WhatsApp" : "Telegram"}`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    })
      .then(() => alert("✅ Заказ успешно отправлен!"))
      .catch(() => alert("❌ Ошибка при отправке заказа"));
  };

  return (
    <div className="p-6 bg-[#111] text-white min-h-screen flex flex-col justify-center items-center space-y-4">
      <h2 className="text-xl font-bold">🛍 Подтверждение заказа</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ваше имя"
        className="p-2 rounded bg-[#222] text-white w-full max-w-xs"
      />

      <input
        type="text"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="WhatsApp или Telegram @username"
        className="p-2 rounded bg-[#222] text-white w-full max-w-xs"
      />

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Ваш город"
        className="p-2 rounded bg-[#222] text-white w-full max-w-xs"
      />

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="whatsapp"
            checked={method === "whatsapp"}
            onChange={() => setMethod("whatsapp")}
          />
          WhatsApp
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="telegram"
            checked={method === "telegram"}
            onChange={() => setMethod("telegram")}
          />
          Telegram
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-green-600 rounded text-white font-bold"
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
