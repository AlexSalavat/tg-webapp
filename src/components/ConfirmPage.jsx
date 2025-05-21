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
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-6 flex flex-col items-center space-y-5">
      <h2 className="text-2xl font-bold">🛍 Подтверждение заказа</h2>

      <div className="w-full max-w-md space-y-4">
        <div>
          <label className="block mb-1 text-sm">👤 Ваше имя</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Иван"
            className="w-full p-3 rounded bg-[#1c1c1c] text-white placeholder-gray-400 border border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">📞 Номер телефона</label>
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="+7..."
            className="w-full p-3 rounded bg-[#1c1c1c] text-white placeholder-gray-400 border border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">🌍 Город</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Москва"
            className="w-full p-3 rounded bg-[#1c1c1c] text-white placeholder-gray-400 border border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">📲 Способ связи:</label>
          <div className="flex gap-2">
            <button
              onClick={() => setMethod("whatsapp")}
              className={`w-1/2 p-2 rounded font-semibold ${
                method === "whatsapp"
                  ? "bg-green-600 text-white"
                  : "bg-[#1c1c1c] text-gray-300 border border-gray-600"
              }`}
            >
              🟢 WhatsApp
            </button>
            <button
              onClick={() => setMethod("telegram")}
              className={`w-1/2 p-2 rounded font-semibold ${
                method === "telegram"
                  ? "bg-blue-600 text-white"
                  : "bg-[#1c1c1c] text-gray-300 border border-gray-600"
              }`}
            >
              🔵 Telegram
            </button>
          </div>
        </div>

        {orderId && (
          <div className="text-green-400 font-medium text-center">
            ✅ Заказ №{orderId} успешно отправлен!
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-green-600 text-white rounded font-bold hover:bg-green-700"
        >
          ✅ Отправить заявку
        </button>

        <button
          onClick={onBack}
          className="w-full py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          ← Назад
        </button>
      </div>
    </div>
  );
};

export default ConfirmPage;
