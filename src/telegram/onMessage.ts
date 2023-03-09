// import TelegramBot from "node-telegram-bot-api";
// import { randomFrom } from "../../common/random/utils.js";
// import { fuckYous } from "./definitions.js";

// export function onMessage(bot: TelegramBot): void {
//   bot.on("message", async (message) => {
//     const { from, chat } = message;

//     const chatId = chat.id
//     const fromPart = from ?
//       `@${from.username} (${from.first_name} ${from.last_name}):`
//       : `Unknown fool:`;
//     const messageContent = message.text;

//     console.log(`${fromPart} ${messageContent}`);

//     const reply = randomFrom(fuckYous);

//     console.log(`@RuminatBot: ${reply}\n`);

//     bot.sendMessage(chatId, reply);
//   })
// }
