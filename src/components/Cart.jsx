import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const cartContext = useCart();

  if (!cartContext || typeof cartContext !== "object") {
    return <div>Ошибка: нет доступа к корзине</div>;
  }

  const { cartItems = [], removeFromCart, clearCart } = cartContext;

  const items = Array.isArray(cartItems) ? cartItems : [];

  const total = items.reduce((sum, item) => {
    const qty = typeof item.quantity === "number" ? item.quantity : 0;
    const price = typeof item.price === "number" ? item.price : 0;
    return sum + qty * price;
  }, 0);

  return (
    <div className="p-4 bg-white min-h-screen font-sans">
      <h2 className="text-xl font-bold mb-4">🛒 Корзина</h2>

      {items.length === 0 ? (
        <p className="text-gray-500">Корзина пуста.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    {item.quantity} × {item.price} ₽
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm"
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 font-semibold text-lg">Итого: {total} ₽</div>

          <div className="mt-4 space-x-2">
            <button
              className="bg-green-600 text-white py-2 px-4 rounded"
              onClick={() => {
                alert("Оформление заказа ещё не реализовано");
              }}
            >
              ✅ Оформить заказ
            </button>
            <button
              className="bg-gray-300 text-black py-2 px-4 rounded"
              onClick={clearCart}
            >
              Очистить
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
