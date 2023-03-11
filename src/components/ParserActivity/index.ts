import { readFile, writeToFile } from "../../lib/fs/utils";
import { TParser } from "../../models/Parser/definitions";
import { PARSER_ACTIVITY_FILE_PATH, TParserActivityBody, TParserActivityStore } from "./definitions";

export async function updateParserActivity(body: TParserActivityBody, abortController: AbortController): Promise<void> {
  const newStore = await getParserActivity(abortController);

  newStore[body.parser.id] = { ...body, time: Date.now() };

  await writeToFile(PARSER_ACTIVITY_FILE_PATH, JSON.stringify(newStore), abortController);
}

export async function clearParsersActivities(ids: TParser["id"][], abortController: AbortController): Promise<void> {
  const newStore = await getParserActivity(abortController);

  for (const id of ids) {
    newStore[id] = undefined;
  }

  await writeToFile(PARSER_ACTIVITY_FILE_PATH, JSON.stringify(newStore), abortController);
}

export async function clearAllParsersActivities(abortController: AbortController): Promise<void> {
  await writeToFile(PARSER_ACTIVITY_FILE_PATH, JSON.stringify({}), abortController);
}

export async function getParserActivity(abortController: AbortController): Promise<TParserActivityStore> {
  const currentStore = await readFile(PARSER_ACTIVITY_FILE_PATH, abortController);

  return currentStore ? JSON.parse(currentStore) : {};
}
