import TelegramBot from "node-telegram-bot-api";

const token = '7058894670:AAEk1J5y51h3H_2CxOoqbsertF8AhbSQ9f0'

const bot = new TelegramBot(token, {polling: true});

let chats = {};

const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{'text': '1', callback_data: '1'}, {'text': '2', callback_data: '2'}, {'text': '3', callback_data: '3'}],
      [{'text': '4', callback_data: '4'}, {'text': '5', callback_data: '5'}, {'text': '6', callback_data: '6'}],
      [{'text': '7', callback_data: '7'}, {'text': '8', callback_data: '8'}, {'text': '9', callback_data: '9'}],
      [{'text': '0', callback_data: '0'}],
    ]
  })
}

const againOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{'text': 'Game again?', callback_data: '/again'}],
    ]
  })
}

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
      await bot.sendSticker(chatId, 'https://sl.combot.org/dev_pack/webp/13xf09f9982.webp')
      return bot.sendMessage(chatId, `Wellcome from vadnet Bot`)
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








