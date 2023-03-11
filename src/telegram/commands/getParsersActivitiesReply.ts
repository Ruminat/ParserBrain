import TelegramBot from "node-telegram-bot-api";
import { notEmptyArray } from "../../common/empty/utils";
import { getParsersActivities } from "../../components/ParserActivity";
import { getActivitiesLines } from "../../components/ParserActivity/utils";
import { b } from "../utils";

export function getParsersActivitiesReply(message: TelegramBot.Message) {
  const username = message.from?.username?.toLocaleLowerCase();
  if (!username) {
    return b("Ты кто такой? Я тебе ничего не покажу...");
  }

  const activities = getParsersActivities();
  if (Object.values(activities).length === 0) {
    return b("Мне ничего не известно об этих грязных парсерах....");
  }

  const lines = getActivitiesLines(activities, { filterByLogin: true, login: username });

  if (notEmptyArray(lines)) {
    const title = b("Солнце ещё не село, а эти ниггеры уже не работают:");
    return `${title}\n${lines.join("\n")}`;
  } else {
    return b("Всё в порядке — все рабы заняты делом");
  }
}
