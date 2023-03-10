import { formatTimeAgo } from "../../lib/date/utils";
import { TParserAction, TParserActivityStore } from "./definitions";

export function getActivitiesLines(activities: TParserActivityStore): string[] {
  const result: string[] = [];

  let i = 1;
  const jija = Object.values(activities);
  for (const activity of jija) {
    if (!activity) continue;

    const { id, name, url } = activity.parser;
    const action = getActionLabel(activity.action);
    const nameAndUrl = `${name ? ` (${name})` : ""}${url ? ` (${url})` : ""}`;
    const parserText = `<code>${id}</code>${nameAndUrl} — ${action}`;

    const time = formatTimeAgo(activity.time);

    const prefix = `${paddedIndex(jija.length, i)}. `;
    result.push(`${prefix}${parserText} (${time})`);

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
