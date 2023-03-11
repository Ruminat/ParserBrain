import { notEmptyArray } from "../../common/empty/utils";
import { getParsersActivities } from "../../components/ParserActivity";
import { getActivitiesLines } from "../../components/ParserActivity/utils";

export async function getAllParsersActivitiesReply(abortController: AbortController) {
  const activities = await getParsersActivities(abortController);
  const lines = getActivitiesLines(activities, { filter: false });

  if (notEmptyArray(lines)) {
    const title = "Вот так обстоят дела с рабами:";
    return `${title}\n${lines.join("\n")}`;
  } else {
    return `Мне не доложил ни один парсер, пойду за хлыстом...`;
  }
}
