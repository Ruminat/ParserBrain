import { notEmptyArray } from "../../common/empty/utils";
import { getParsersActivities } from "../../components/ParserActivity";
import { getActivitiesLines } from "../../components/ParserActivity/utils";
import { b } from "../utils";

export function getParsersActivitiesReply() {
  const activities = getParsersActivities();

  if (Object.values(activities).length === 0) {
    return b("Мне ничего не известно об этих грязных парсерах....");
  }

  const lines = getActivitiesLines(activities);

  if (notEmptyArray(lines)) {
    const title = b("Солнце ещё не село, а эти ниггеры уже не работают:");
    return `${title}\n${lines.join("\n")}`;
  } else {
    return b("Всё в порядке — все рабы заняты делом");
  }
}
