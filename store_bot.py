import asyncio
import json
import datetime
import requests
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import CommandStart
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties
from aiogram.types import WebAppInfo, ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton

# 🔐 Токен бота
BOT_TOKEN = "7334255719:AAHbh1FToqydNAWb-iA-oYTHJzN7Ms0oNts"

# ✅ SheetDB API URL
SHEETDB_URL = "https://sheetdb.io/api/v1/puwfh4ykjybvu"

# 🤖 Инициализация
bot = Bot(token=BOT_TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
dp = Dispatcher()

# ✅ Обработка команды /start
@dp.message(CommandStart())
async def handle_start(message: types.Message):
    markup = ReplyKeyboardMarkup(keyboard=[[
        KeyboardButton(text="🛍️ Открыть магазин", web_app=WebAppInfo(url="https://tg-webapp-gamma.vercel.app"))
    ]], resize_keyboard=True)
    await message.answer("Нажми кнопку ниже, чтобы открыть магазин 👇", reply_markup=markup)
    print("DEBUG: /start")

# ✅ Команда: пост в канал
@dp.message(F.text.lower() == "пост")
async def send_post(message: types.Message):
    markup = InlineKeyboardMarkup(inline_keyboard=[[ 
        InlineKeyboardButton(
            text="🍭 Открыть магазин",
            url="https://t.me/SkinKorea_bot?startapp"
        )
    ]])
    await bot.send_message(
        chat_id=message.chat.id,
        text=(
            "<b>Косметология — это про результат. Мы знаем, где его найти.</b>\n\n"
            "🔹 Прямые поставки корейских инъекционных препаратов для косметологов и салонов.\n"
            "🔹 В наличии — только проверенные, известные бренды.\n"
            "🔹 Следим за новинками с доказанным эффектом — добавляем в каталог только лучшее.\n"
            "🔹 Без лишних наценок: хорошая цена благодаря работе без посредников.\n"
            "🔹 Мы только начинаем — ассортимент пока компактный, но каждый месяц растёт.\n"
            "🔹 Находимся в Москве, доставляем по всей России.\n\n"
            "Если вы цените качество и результат — вам к нам.\n"
            "🔻 <b>Перейти в Beauty-Маркет</b>"
        ),
        reply_markup=markup
    )
    await message.answer("📢 Пост отправлен.")

# ✅ Обработка данных из WebApp
@dp.message(F.web_app_data)
async def webapp_handler(message: types.Message):
    print("[!] Получено web_app_data")
    print(f"Received data raw: {message.web_app_data.data}")

    try:
        data = json.loads(message.web_app_data.data)
        items = data.get("items", [])
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        for item in items:
            row = {
                "data": [{
                    "Дата": now,
                    "Имя": message.from_user.full_name,
                    "Telegram ID": str(message.from_user.id),
                    "Товар": item["name"],
                    "Кол-во": str(item["quantity"]),
                    "Цена": str(item["price"]),
                    "Сумма": str(item["quantity"] * item["price"])
                }]
            }

            print(f"[Отправка в SheetDB]: {json.dumps(row, ensure_ascii=False)}")

            response = requests.post(SHEETDB_URL, json=row)
            print(f"[SheetDB] Ответ: {response.status_code} - {response.text}")

        await message.answer("✅ Заказ оформлен и отправлен! Благодарим 🙌")
    except Exception as e:
        print(f"[Ошибка WebApp] {e}")
        await message.answer("❌ Ошибка при оформлении. Попробуйте позже.")

# ✅ Лог всех остальных сообщений
@dp.message()
async def debug_all(message: types.Message):
    print(f"DEBUG: {message.chat.id=} {message.text=}")
    await message.answer("✅ Я тебя слышу!")

# 🚀 Запуск
async def main():
    print("⏳ main() стартует...")
    await dp.start_polling(bot)
    print("✅ Polling начат")

if __name__ == "__main__":
    print("👀 Бот запускается...")
    asyncio.run(main())