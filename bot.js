const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = 'https://wholadentist.github.io/astroscope_webapp/';

const bot = new TelegramBot(token, {polling: true});

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    bot.sendMessage(chatId, 'Добро пожаловать в Астроскоп! Выберите действие:', {
        reply_markup: {
            keyboard: [
                [{text: 'Получить гороскоп', web_app: {url: webAppUrl}}]
            ],
            resize_keyboard: true
        }
    });
});

// Обработка данных от веб-приложения
bot.on('web_app_data', (msg) => {
    const chatId = msg.chat.id;
    const data = msg.web_app_data.data;
    
    bot.sendMessage(chatId, data);
}); 