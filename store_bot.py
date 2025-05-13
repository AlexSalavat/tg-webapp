# ✅ store_bot.py — минимальный, чистый, готов к запуску
import asyncio
import json
import datetime
import gspread
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import CommandStart
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton
from oauth2client.service_account import ServiceAccountCredentials

# 🔐 Токен бота
BOT_TOKEN = "7558812308:AAG4PwMjatnbNU6xAaS2qWAbciauFvpbEHU"

# 🔐 Google Sheets
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("google_key.json", scope)
client = gspread.authorize(creds)
sheet = client.open("Заказы KSHOT").sheet1

# 🤖 Инициализация
bot = Bot(token=BOT_TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
dp = Dispatcher()

# ✅ Кнопка WebApp
@dp.message(CommandStart())
async def start(message: types.Message):
    kb = InlineKeyboardMarkup(
        inline_keyboard=[[InlineKeyboardButton(
            text="🛍 Beauty-Маркет",
            web_app=WebAppInfo(url="https://tg-webapp-gamma.vercel.app")
        )]]
    )
    await message.answer("Добро пожаловать в <b>KSHOT</b> — открой магазин по кнопке ниже:", reply_markup=kb)

# ✅ Команда: пост в канал
@dp.message(F.text.lower() == "пост")
async def send_post(message: types.Message):
    markup = InlineKeyboardMarkup(inline_keyboard=[[
        InlineKeyboardButton(
            text="🛍 Перейти в Beauty-Маркет",
            web_app=WebAppInfo(url="https://tg-webapp-gamma.vercel.app")
        )
    ]])
    await bot.send_message(
        chat_id="@NEUROBIZ_BIZ",
        text="KSHOT — корейская косметология в Telegram. Удобно. Быстро. 💉\n\nНажми кнопку и заходи в магазин 👇",
        reply_markup=markup
    )
    await message.answer("📢 Пост отправлен в канал.")

# ✅ Обработка заказа из WebApp
@dp.message(F.web_app_data)
async def webapp_handler(message: types.Message):
    try:
        data = json.loads(message.web_app_data.data)
        items = data.get("items", [])
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        for item in items:
            sheet.append_row([
                now,
                message.from_user.full_name,
                message.from_user.id,
                item["name"],
                item["quantity"],
                item["price"],
                item["quantity"] * item["price"]
            ])

        await message.answer("✅ Заказ оформлен и отправлен! Благодарим 🙌")
    except Exception as e:
        print(f"[Ошибка WebApp] {e}")
        await message.answer("❌ Ошибка при оформлении. Попробуйте позже.")

# 🚀 Запуск
async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
