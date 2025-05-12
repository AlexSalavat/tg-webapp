import datetime
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from aiogram import Bot, Dispatcher, types, F
from aiogram.types import WebAppInfo, KeyboardButton, ReplyKeyboardMarkup
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message
from aiogram.client.default import DefaultBotProperties
import asyncio

# Token бота
BOT_TOKEN = "7558812308:AAG4PwMjatnbNU6xAaS2qWAbciauFvpbEHU"

# Google Sheets
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("google_key.json", scope)
client = gspread.authorize(creds)
sheet = client.open("Заказы KSHOT").sheet1

# Init бота
bot = Bot(token=BOT_TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
dp = Dispatcher()

# Команда /start
@dp.message(CommandStart())
async def start(message: Message):
    kb = ReplyKeyboardMarkup(
        keyboard=[
            [
                KeyboardButton(
                    text="🛒 Beauty-маркет",
                    web_app=WebAppInfo(
                        url="https://tg-webapp-gamma.vercel.app"
                    )
                ),
                KeyboardButton(text="🤖 Посоветуй мне")
            ],
            [
                KeyboardButton(text="✨ Что новенького?"),
                KeyboardButton(text="💬 Поддержка")
            ]
        ],
        resize_keyboard=True
    )

    await message.answer(
        "📦 <b>KSHOT — твой Telegram-магазин корейской инъекционной косметики 💉</b>\n\n"
        "Каталог, советы, новинки и поддержка — всё в одном месте 👇",
        reply_markup=kb
    )

# 💥 Обработка данных из WebApp
@dp.message(F.web_app_data)
async def webapp_handler(message: Message):
    data = message.web_app_data.data
    print(f"[WebApp] Получен заказ от {message.from_user.full_name}:")
    print(data)

    try:
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        sheet.append_row([now, message.from_user.full_name, message.from_user.id, data])
        await message.answer("✅ Заказ успешно оформлен! Спасибо!")
    except Exception as e:
        print(f"[WebApp ERROR] {e}")
        await message.answer("❌ Не удалось сохранить заказ. Попробуй позже.")

# Запуск
async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
