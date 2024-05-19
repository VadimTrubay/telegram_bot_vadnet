import TelegramBot from "node-telegram-bot-api";

const token = '7058894670:AAEk1J5y51h3H_2CxOoqbsertF8AhbSQ9f0'

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async msg => {
  console.log(msg)
  await bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}`)
})








