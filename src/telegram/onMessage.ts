import TelegramBot from "node-telegram-bot-api";
import { logInfo } from "../common/logging";
import { getAllParsersActivitiesReply } from "./commands/getAllParsersActivitiesReply";
import { getParsersActivitiesReply } from "./commands/getParsersActivitiesReply";
import { getHelpReply } from "./commands/help";
import { ETelegramCommand, TELEGRAM_COMMAND_SYNONYMS } from "./definitions";

export function telegramOnMessage(bot: TelegramBot): void {
  console.log(`\n  - ParserBrainBot is listening...\n`);

  bot.on("message", (message) => {
    const { from, chat } = message;

    const chatId = chat.id;
    const fromPart = from ? `@${from.username} (${from.first_name} ${from.last_name}):` : `Unknown fool:`;
    const messageParsed = message.text ? message.text.toLowerCase().replace(/ё/g, "е") : message.text;

    logInfo(`${fromPart} ${message.text}`);

    const reply = getReply();

    logInfo(`@ParserBrainBot: ${reply}\n`);

    bot.sendMessage(chatId, reply, { parse_mode: "HTML" });

    function getReply() {
      if (!messageParsed || TELEGRAM_COMMAND_SYNONYMS[ETelegramCommand.HELP].includes(messageParsed)) {
        return getHelpReply();
      } else if (TELEGRAM_COMMAND_SYNONYMS[ETelegramCommand.ALL_ACTIVITIES].includes(messageParsed)) {
        return getAllParsersActivitiesReply(message);
      } else if (TELEGRAM_COMMAND_SYNONYMS[ETelegramCommand.CHERTI_ACTIVITIES].includes(messageParsed)) {
        return getParsersActivitiesReply(message);
      } else {
        bot.sendMessage(chatId, "Не понял, чего тебе надо, так что держи статус упырей", { parse_mode: "HTML" });
        return getParsersActivitiesReply(message);
      }
    }
  });
}
