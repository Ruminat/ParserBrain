import { notEmptyArray } from "../../common/empty/utils";
import { ETelegramCommand, TELEGRAM_COMMAND_SYNONYMS } from "../definitions";
import { b, code } from "../utils";

const commands = [
  getCommand(ETelegramCommand.CHERTI_ACTIVITIES, "выводит статус парсеров-оболтусов."),
  getCommand(
    ETelegramCommand.DELETE,
    `удаляет данные о парсерах (IP через пробелы).\n    Например: ${code("удали 128.228.228.228 167.69.69.69")}.`
  ),
  getCommand(ETelegramCommand.ALL_ACTIVITIES, "выводит статус всех парсеров."),
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
  const moreLabels = labels.slice(1, labels.length - 1);
  const moreLabelsPart = notEmptyArray(moreLabels) ? `\n    Можно ещё так: (${moreLabels.join(", ")})` : "";
  return `- ${code(label)} (${code(command)}) — ${text}${moreLabelsPart}`;
}
