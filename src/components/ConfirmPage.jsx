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
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-6 space-y-5">
      <h2 className="text-xl font-bold">🛍 Подтверждение заказа</h2>

      <div className="w-full max-w-sm space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="👤 Ваше имя"
          className="w-full p-3 rounded bg-[#222] text-white placeholder-gray-400"
        />
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="📞 Номер телефона"
          className="w-full p-3 rounded bg-[#222] text-white placeholder-gray-400"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="🌍 Город"
          className="w-full p-3 rounded bg-[#222] text-white placeholder-gray-400"
        />

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setMethod("whatsapp")}
            className={`w-1/2 py-2 rounded ${
              method === "whatsapp" ? "bg-green-600 text-white" : "bg-[#222] text-gray-300"
            }`}
          >
            🟢 WhatsApp
          </button>
          <button
            onClick={() => setMethod("telegram")}
            className={`w-1/2 py-2 rounded ${
              method === "telegram" ? "bg-blue-600 text-white" : "bg-[#222] text-gray-300"
            }`}
          >
            🔵 Telegram
          </button>
        </div>

        {orderId && (
          <div className="text-center text-green-400 font-medium">
            ✅ Заказ №{orderId} отправлен!
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-green-600 text-white rounded font-bold"
        >
          ✅ Отправить заявку
        </button>

        <button
          onClick={onBack}
          className="w-full py-2 bg-gray-700 text-white rounded"
        >
          ← Назад
        </button>
      </div>
    </div>
  );
};

export default ConfirmPage;
