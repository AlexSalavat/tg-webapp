from aiogram.types import WebAppInfo, KeyboardButton, ReplyKeyboardMarkup
from aiogram.filters import CommandStart
from aiogram import Bot, Dispatcher, types

@dp.message(CommandStart())
async def start(message: types.Message):
    kb = ReplyKeyboardMarkup(
        keyboard=[
            [
                KeyboardButton(
                    text="🛒 Beauty-маркет",
                    web_app=WebAppInfo(url="https://tg-webapp-gamma.vercel.app")
                )
            ],
            [
                KeyboardButton(text="🤖 Посоветуй мне"),
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
