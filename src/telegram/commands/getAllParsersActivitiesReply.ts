import { notEmptyArray } from "../../common/empty/utils";
import { getParsersActivities } from "../../components/ParserActivity";
import { getActivitiesLines } from "../../components/ParserActivity/utils";
import { b } from "../utils";

export function getAllParsersActivitiesReply() {
  const activities = getParsersActivities();
  const lines = getActivitiesLines(activities, { filter: false });

  if (notEmptyArray(lines)) {
    const title = b("Вот так обстоят дела с рабами:");
    return `${title}\n${lines.join("\n")}`;
  } else {
    return b(`Мне не доложил ни один парсер, пойду за хлыстом...`);
  }
}
