import TelegramBot from "node-telegram-bot-api";
import { getParsersActivityReply } from "./commands/getParsersActivity";
import { getHelpReply } from "./commands/help";

export function telegramOnMessage(bot: TelegramBot): void {
  console.log(`\n  - ParserBrainBot is listening...\n`);

  bot.on("message", async (message) => {
    const abortController = new AbortController();

    const { from, chat } = message;

    const chatId = chat.id;
    const fromPart = from ? `@${from.username} (${from.first_name} ${from.last_name}):` : `Unknown fool:`;
    const messageContent = message.text;

    console.log(`${fromPart} ${messageContent}`);

    const reply = await getReply();

    console.log(`@ParserBrainBot: ${reply}\n`);

    bot.sendMessage(chatId, reply, { parse_mode: "HTML" });

    async function getReply() {
      if (!messageContent || ["/start", "/help", "чё каво", "че каво"].includes(messageContent)) {
        return getHelpReply();
      } else {
        return getParsersActivityReply(abortController);
      }
    }
  });
}
