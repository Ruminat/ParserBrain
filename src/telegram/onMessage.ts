import TelegramBot from "node-telegram-bot-api";
import { logInfo } from "../common/logging";
import { getHelpReply } from "./commands/help";
import { getKekReply } from "./commands/kek";
import { getParsersStatusReply } from "./commands/parsersStatus";
import { ETelegramCommand, TELEGRAM_COMMAND_SYNONYMS } from "./definitions";

export function telegramOnMessage(bot: TelegramBot): void {
  console.log(`\n  - ParserBrainBot is listening...\n`);

  bot.on("message", (message) => {
    const { from, chat } = message;

    const chatId = chat.id;
    const fromPart = from ? `@${from.username} (${from.first_name} ${from.last_name}):` : `Unknown fool:`;
    const messageParsed = message.text ? message.text.toLowerCase().replace(/ё/g, "е") : message.text;

    try {
      logInfo(`${fromPart} ${message.text}`);

      const reply = getReply();

      logInfo(`@ParserBrainBot: ${reply}\n`);

      bot.sendMessage(chatId, reply, { parse_mode: "HTML" });

      function getReply() {
        if (!messageParsed || TELEGRAM_COMMAND_SYNONYMS[ETelegramCommand.HELP].includes(messageParsed)) {
          return getHelpReply();
        }

        const kek = getKekReply(bot, chatId, messageParsed);
        if (kek) return kek;

        return getParsersStatusReply(bot, chatId, message, messageParsed);
      }
    } catch (error) {
      console.log("PIZDA", error);
      bot.sendMessage(chatId, "Что-то пошло не так...", { parse_mode: "HTML" });
    }
  });
}
