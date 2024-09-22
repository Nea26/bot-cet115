import 'dotenv/config'
import TelegramBot from "node-telegram-bot-api"
import {
  buscarAccion
} from "./index.mjs"

const bot = new TelegramBot(process.env.token, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; 
  bot.sendMessage(chatId, resp);
});

bot.on('message', ({ chat: { id }, text }) => {
  const fn = buscarAccion(text)
  bot.sendMessage(id, fn(text));
});

bot.on("error", console.log)

bot.on("connect", (params)=>{
  console.log(params)
})




