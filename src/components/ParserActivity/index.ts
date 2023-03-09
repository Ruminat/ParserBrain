import { readFile, writeToFile } from "../../lib/fs/utils";
import { PARSER_ACTIVITY_FILE_PATH, TParserActivityBody, TParserActivityStore } from "./definitions";

export async function saveParserActivity(
  body: TParserActivityBody,
  abortController: AbortController
): Promise<TParserActivityStore> {
  const newStore = await getParserActivity(abortController);

  newStore[body.parser.id] = { ...body, time: Date.now() };

  await writeToFile(PARSER_ACTIVITY_FILE_PATH, JSON.stringify(newStore), abortController);

  return newStore;
}

export async function getParserActivity(abortController: AbortController): Promise<TParserActivityStore> {
  const currentStore = await readFile(PARSER_ACTIVITY_FILE_PATH, abortController);

  return currentStore ? JSON.parse(currentStore) : {};
}
