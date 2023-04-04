import TelegramBot from "node-telegram-bot-api";
import { randomFrom } from "../../common/random/utils";
import { ANECDOTES } from "../../common/surprise/anecdotes";
import { sendRicardoSticker, sendShrekSticker } from "../utils";

export function getKekReply(bot: TelegramBot, chatId: number, messageParsed: string) {
  if (messageParsed.includes("шрек") || messageParsed.includes("shrek")) {
    sendShrekSticker(bot, chatId);
    return "Кто-то сказал Шрек?! Ебу Алибабу! Не ожидал услышать!";
  } else if (messageParsed.includes("балдеж")) {
    sendRicardoSticker(bot, chatId);
    return "Балдёж? Да это не просто балдёж — это ебать его мать чиллябинск нахуй!";
  } else if (messageParsed.includes("анекдот")) {
    return randomFrom(ANECDOTES);
  } else {
    return undefined;
  }
}
