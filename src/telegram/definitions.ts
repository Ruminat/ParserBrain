export enum ETelegramCommand {
  HELP = "/help",
  ALL_ACTIVITIES = "/all",
  CHERTI_ACTIVITIES = "/cherti",
  DELETE = "/delete",
}

export const TELEGRAM_COMMAND_SYNONYMS = {
  [ETelegramCommand.HELP]: ["спаси", "сохрани", "help", "/start", ETelegramCommand.HELP],
  [ETelegramCommand.ALL_ACTIVITIES]: ["покажи всех", "все", ETelegramCommand.ALL_ACTIVITIES],
  [ETelegramCommand.CHERTI_ACTIVITIES]: ["че каво", "черти", ETelegramCommand.CHERTI_ACTIVITIES],
  [ETelegramCommand.DELETE]: ["удали", "delete", ETelegramCommand.DELETE],
};
