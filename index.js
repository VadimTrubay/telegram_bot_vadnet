import {config} from 'dotenv'
import TelegramBot from "node-telegram-bot-api";
import {gameOptions, againOptions} from "./options.js";

config()

const token = process.env.TELEGRAM_API_TOKEN

const bot = new TelegramBot(token, {polling: true});

let chats = {};

const startGame = async (chatId) => {
  chats['chatId'] = Math.floor(Math.random() * 10).toString();
  await bot.sendMessage(chatId, `what is your guess?`, gameOptions)
}

const start = () => {
  bot.setMyCommands(
    [
      {
        command: '/start',
        description: 'Start chat'
      },
      {
        command: '/info',
        description: 'Info user name'
      },
      {
        command: '/game',
        description: 'Start game'
      }
    ]
  )
  bot.on('message', async msg => {
    const text = msg.text;
    const name = msg.chat.first_name;
    const chatId = msg.chat.id;

    if (text === '/start') {
      await bot.sendSticker(chatId, 'https://sl.combot.org/wot7777/webp/5xf09f98b6.webp')
      return bot.sendMessage(chatId, `Wellcome from telegram bot vadnet`)
    }
    if (text === '/info') {
      return bot.sendMessage(chatId, `your name: ${name}`)
    }
    if (text === '/game') {
     return await startGame(chatId)
    }
    return bot.sendMessage(chatId, `I don't understand you`)
  })

  bot.on('callback_query', async query => {
    const chatId = query.message.chat.id;
    const data = query.data;

    if (data === '/again') {
      return await startGame(chatId)
    }
    if (data === chats['chatId']) {
      return bot.sendMessage(chatId, `you win, bot guess number ${chats['chatId']}`, againOptions)
    } else {
      return bot.sendMessage(chatId, `you lose, bot guess number ${chats['chatId']}`, againOptions)
    }
  })
}

start();








