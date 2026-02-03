"""
Пример Telegram бота для Clash of Clans Web App

Установка зависимостей:
    pip install -r requirements.txt
    или
    pip install python-telegram-bot>=20.0

Примечание: Этот файл является примером и не требуется для работы Web App.
Он нужен только если вы хотите создать Telegram бота на Python.
"""

# type: ignore - Импорты будут доступны после установки python-telegram-bot
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo  # noqa: E402
from telegram.ext import Application, CommandHandler, CallbackContext  # noqa: E402
import os

# Замените на ваш токен бота от @BotFather
BOT_TOKEN = os.getenv('BOT_TOKEN', '8447879501:AAEl7x1BD9_g0Sv1-ToGceiLzUehw3D48-k')

# URL вашего Web App (должен быть HTTPS)
WEB_APP_URL = os.getenv('WEB_APP_URL', 'https://yourdomain.com/index.html')


async def start(update: Update, context: CallbackContext) -> None:
    """Обработчик команды /start"""
    # Создание кнопки Web App
    web_app_button = InlineKeyboardButton(
        text="🏰 Выбрать базу",
        web_app=WebAppInfo(url=WEB_APP_URL)
    )
    
    keyboard = InlineKeyboardMarkup([[web_app_button]])
    
    await update.message.reply_text(
        "👋 Добро пожаловать в Clash of Clans Base Selector!\n\n"
        "Выберите базу для вашего уровня ратуши:",
        reply_markup=keyboard
    )


async def bases(update: Update, context: CallbackContext) -> None:
    """Обработчик команды /bases - показывает кнопку Web App"""
    web_app_button = InlineKeyboardButton(
        text="🏰 Открыть базы",
        web_app=WebAppInfo(url=WEB_APP_URL)
    )
    
    keyboard = InlineKeyboardMarkup([[web_app_button]])
    
    await update.message.reply_text(
        "Откройте приложение для выбора базы:",
        reply_markup=keyboard
    )


async def help_command(update: Update, context: CallbackContext) -> None:
    """Обработчик команды /help"""
    help_text = """
📖 Помощь по использованию бота:

/start - Начать работу с ботом
/bases - Открыть приложение выбора баз
/help - Показать эту справку

🏰 Приложение позволяет:
• Выбрать уровень ратуши (TH6-TH18)
• Просмотреть доступные базы
• Импортировать базу в игру Clash of Clans

Для использования приложения нажмите кнопку "Выбрать базу" или используйте команду /bases
    """
    await update.message.reply_text(help_text)


def main() -> None:
    """Запуск бота"""
    # Создание приложения
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Регистрация обработчиков команд
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("bases", bases))
    application.add_handler(CommandHandler("help", help_command))
    
    # Запуск бота
    print("Бот запущен...")
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == '__main__':
    main()
