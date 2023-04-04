import TelegramBot from "node-telegram-bot-api";
import { clearParsersActivities, getParsersActivities } from "../../components/ParserActivity";
import { getActivitiesLines } from "../../components/ParserActivity/utils";
import { ETelegramCommand, TELEGRAM_COMMAND_SYNONYMS as synonym } from "../definitions";
import { b, code, messageHasPrefix, sendWhatSticker } from "../utils";

export function getParsersStatusReply(
  bot: TelegramBot,
  chatId: number,
  message: TelegramBot.Message,
  messageParsed: string
) {
  if (messageHasPrefix(synonym[ETelegramCommand.ALL_ACTIVITIES], messageParsed)) {
    return getAllParsersActivitiesReply(message);
  } else if (messageHasPrefix(synonym[ETelegramCommand.CHERTI_ACTIVITIES], messageParsed)) {
    return getParsersActivitiesReply(message);
  } else if (messageHasPrefix(synonym[ETelegramCommand.DELETE], messageParsed)) {
    return getParsersDeleteReply(message);
  } else {
    if (Math.random() < 0.5) {
      sendWhatSticker(bot, chatId);
    }
    bot.sendMessage(chatId, "Не понял, чего тебе надо, так что держи статус упырей", { parse_mode: "HTML" });
    return getParsersActivitiesReply(message);
  }
}

function getParsersDeleteReply(message: TelegramBot.Message) {
  try {
    getUsername(message);
    const [, ...ids] = message.text ? message.text.split(" ") : [];
    if (!ids || ids.length === 0) {
      throw new Error(`Не понял, что надо удалить. Посмотри пример в ${code("/help")}.`);
    }
    clearParsersActivities(ids);

    const title = b("Выкинул инфу о следующих парсерах:");
    return `${title}\n${ids.map((id) => `— ${code(id)}`).join("\n")}`;
  } catch (error) {
    return b((error as Error).message);
  }
}

function getAllParsersActivitiesReply(message: TelegramBot.Message) {
  try {
    const username = getUsername(message);
    const activities = getAllActivities();
    const isAdmin = getIsAdmin(message, username);
    const lines = getActivitiesLines(activities, { filterByTime: false, filterByLogin: !isAdmin, login: username });
    if (!lines || lines.length === 0) {
      return b(`Мне не доложил ни один парсер, пойду за хлыстом...`);
    }

    const title = b("Вот так обстоят дела с рабами:");
    return `${title}\n${lines.join("\n")}`;
  } catch (error) {
    return b((error as Error).message);
  }
}

export function getParsersActivitiesReply(message: TelegramBot.Message) {
  try {
    const username = getUsername(message);
    const activities = getAllActivities();
    const isAdmin = getIsAdmin(message, username);
    const lines = getActivitiesLines(activities, { filterByTime: true, filterByLogin: !isAdmin, login: username });
    if (!lines || lines.length === 0) {
      return b("Всё в порядке — все рабы заняты делом");
    }

    const title = b("Солнце ещё не село, а эти ниггеры уже не работают:");
    return `${title}\n${lines.join("\n")}`;
  } catch (error) {
    return b((error as Error).message);
  }
}

function getIsAdmin(message: TelegramBot.Message, username: string) {
  return message.text?.includes("!admin") && username === "ruminat";
}

function getUsername(message: TelegramBot.Message) {
  const username = message.from?.username?.toLocaleLowerCase();
  if (!username) {
    throw new Error("Ты кто такой? Я тебе ничего не покажу...");
  }

  return username;
}

function getAllActivities() {
  const activities = getParsersActivities();
  if (Object.values(activities).length === 0) {
    throw new Error("Мне ничего не известно об этих грязных парсерах....");
  }
  return activities;
}
