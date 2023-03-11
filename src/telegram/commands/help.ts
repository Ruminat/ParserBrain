import { ETelegramCommand, TELEGRAM_COMMAND_SYNONYMS } from "../definitions";
import { b, code } from "../utils";

const commands = [
  getCommand(ETelegramCommand.CHERTI_ACTIVITIES, "выводит статус парсеров-оболтусов,"),
  getCommand(ETelegramCommand.ALL_ACTIVITIES, "выводит статус всех парсеров,"),
  getCommand(ETelegramCommand.HELP, "выводит помощь (документацию)."),
];

const title = b("Я вас категорически приветствую.\nВот доступные команды:\n");

const helpMessage = `${title}\n${commands.join("\n")}`;

export function getHelpReply(): string {
  return helpMessage;
}

function getCommand(command: ETelegramCommand, text: string): string {
  const labels = TELEGRAM_COMMAND_SYNONYMS[command];
  const label = labels[0];
  return `- ${code(label)} (${code(command)}) — ${text}\n    можно ещё так: (${labels.join(", ")})`;
}
