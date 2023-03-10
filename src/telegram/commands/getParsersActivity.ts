import { getParserActivity } from "../../components/ParserActivity";
import { getActivitiesLines } from "../../components/ParserActivity/utils";

export async function getParsersActivityReply(abortController: AbortController) {
  const activities = await getParserActivity(abortController);
  const lines = getActivitiesLines(activities);

  const title = "<b>Солнце ещё не село, а эти ниггеры уже не работают:</b>";
  return `${title}\n${lines.join("\n")}`;
}
