import { notEmpty } from "../../common/empty/utils";
import { formatTimeAgo } from "../../lib/date/utils";
import { TIME_AS_CHERT, TParserAction, TParserActivity, TParserActivityStore } from "./definitions";

export function getActivitiesLines(activities: TParserActivityStore, { filter = true } = {}): string[] {
  const result: string[] = [];

  let i = 1;
  const currentTime = Date.now();

  const allActivities = Object.values(activities);

  const filtered = filter
    ? (allActivities.filter((activity) => {
        if (!activity) return false;
        const diff = currentTime - activity.time;
        return diff > TIME_AS_CHERT;
      }) as TParserActivity[])
    : allActivities.filter(notEmpty);

  filtered.sort((a, b) => a.time - b.time);

  for (const activity of filtered) {
    const { id, name, url } = activity.parser;
    const action = getActionLabel(activity.action);
    const nameAndUrl = `${name ? ` (${name})` : ""}${url ? ` (${url})` : ""}`;
    const parserText = `<code>${id}</code>${nameAndUrl} — ${action}`;

    const time = formatTimeAgo(activity.time);

    const prefix = `${paddedIndex(filtered.length, i)}. `;
    result.push(`${prefix}${parserText} ${time}`);

    i += 1;
  }

  return result;
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
      return "всё запостил";
  }
}
