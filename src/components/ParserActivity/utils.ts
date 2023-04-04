import { groupBy } from "lodash";
import { isEmpty } from "../../common/empty/utils";
import { formatTimeAgo } from "../../lib/date/utils";
import { TIME_AS_CHERT, TParserAction, TParserActivity, TParserActivityStore } from "./definitions";

type TGetActivitiesLinesParams = {
  filterByTime?: boolean;
  filterByLogin?: boolean;
  login?: string;
};

export function getActivitiesLines(activities: TParserActivityStore, params: TGetActivitiesLinesParams = {}): string[] {
  const result: string[] = [];

  const allActivities = Object.values(activities);

  const filtered = filterActivities(allActivities, params);

  // Sort from oldest to newest
  filtered.sort((a, b) => a.time - b.time);

  if (!params.filterByLogin) {
    const grouped = groupBy(filtered, (line) => line.parser.name);
    const groupedLines = Object.entries(grouped).map(
      ([logins, activities], i) => `${i + 1}. ${logins} — ${activities.length}`
    );
    return groupedLines;
  }

  let i = 1;
  for (const activity of filtered) {
    const { id, name, url } = activity.parser;
    const action = getActionLabel(activity.action);
    const nameAndUrl = `${!params.filterByLogin && name ? ` (${name})` : ""}${url ? ` (${url})` : ""}`;
    const parserText = `<code>${id}</code>${nameAndUrl} — ${action}`;

    const time = formatTimeAgo(activity.time);

    const prefix = `${paddedIndex(filtered.length, i)}. `;
    result.push(`${prefix}${parserText} ${time}`);

    i += 1;
  }

  return result;
}

function filterActivities(
  activities: (TParserActivity | undefined)[],
  params: TGetActivitiesLinesParams
): TParserActivity[] {
  const currentTime = Date.now();

  return activities.filter((activity) => {
    if (isEmpty(activity)) return false;

    if (params.filterByLogin && activity.parser.name) {
      if (!params.login) return false;

      const logins = extractLogins(activity.parser.name);

      if (logins.every((login) => params.login !== login)) {
        return false;
      }
    }

    if (!params.filterByTime) {
      return true;
    }

    const diff = currentTime - activity.time;
    return diff > TIME_AS_CHERT;
  }) as TParserActivity[];
}

function extractLogins(logins: string): string[] {
  return logins.split(",").map((login) => login.trim().toLocaleLowerCase());
}

function paddedIndex(maxIndex: number, index: number): string {
  if (!Number.isFinite(maxIndex) || maxIndex <= 0) {
    return `${index}`;
  }

  const digits = Math.floor(Math.log10(maxIndex) + 1);

  return String(index).padStart(digits, "0");
}

function getActionLabel(action: TParserAction): string {
  switch (action) {
    case "started-posting":
      return "начал постить";
    case "downloaded-images":
      return "скачал картинки";
    case "parsed-tags":
      return "спарсил теги";
    case "uploaded-post":
      return "запостил";
    case "finished":
      return "закончил работу";
  }
}
