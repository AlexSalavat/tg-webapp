# ✅ store_bot.py — стабильная схема: кнопка в канале → WebApp через бота
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
BOT_TOKEN = "7643253940:AAH_57oV_nfbpUUYnBY6QuCBYrj8rVjr1Zg"

# 🔐 Google Sheets
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("google_key.json", scope)
client = gspread.authorize(creds)
sheet = client.open("Заказы KSHOT").sheet1

# 🤖 Инициализация
bot = Bot(token=BOT_TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
dp = Dispatcher()

# ✅ Кнопка WebApp в /start
@dp.message(CommandStart())
async def start(message: types.Message):
    kb = InlineKeyboardMarkup(
        inline_keyboard=[[InlineKeyboardButton(
            text="🛍 Открыть магазин",
            web_app=WebAppInfo(url="https://tg-webapp-gamma.vercel.app")
        )]]
    )
    await message.answer("Нажми кнопку ниже, чтобы открыть магазин:", reply_markup=kb)

# ✅ Команда: пост в канал → красивая версия
@dp.message(F.text.lower() == "пост")
async def send_post(message: types.Message):
    markup = InlineKeyboardMarkup(inline_keyboard=[[
        InlineKeyboardButton(
            text="🛍 Beauty-Маркет",
            url="https://t.me/SkinShotMarket_bot?startapp"
        )
    ]])
    await bot.send_message(
        chat_id="@NEUROBIZ_BIZ",
        text=(
            "<b>Косметология — это про результат. Мы знаем, где его найти.</b>\n\n"
            "🔹 Прямые поставки корейских инъекционных препаратов для косметологов и салонов.\n"
            "🔹 В наличии — только проверенные, известные бренды.\n"
            "🔹 Следим за новинками с доказанным эффектом — добавляем в каталог только лучшее.\n"
            "🔹 Без лишних наценок: хорошая цена благодаря работе без посредников.\n"
            "🔹 Мы только начинаем — ассортимент пока компактный, но каждый месяц растёт.\n"
            "🔹 Находимся в Москве, доставляем по всей России.\n\n"
            "Если вы цените качество и результат — вам к нам.\n"
            "👇 <b>Перейти в Beauty-Маркет</b>"
        ),
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
