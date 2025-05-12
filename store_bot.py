import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart
from aiogram.types import WebAppInfo, KeyboardButton, ReplyKeyboardMarkup
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties

# 🔐 Токен бота
BOT_TOKEN = "7558812308:AAG4PwMjatnbNU6xAaS2qWAbciauFvpbEHU"

# 🔧 Инициализация
bot = Bot(token=BOT_TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
dp = Dispatcher()

@dp.message(CommandStart())
async def start(message: types.Message):
    kb = ReplyKeyboardMarkup(
        keyboard=[
            [
                KeyboardButton(
                    text="🛒 Beauty-маркет",
                    web_app=WebAppInfo(url="https://tg-webapp-gamma.vercel.app")
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
        "📦 <b>KSHOT — твой Telegram-магазин</b>\n\nЗапускай маркет 👇",
        reply_markup=kb
    )

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
