import produce from "immer";
import { createJsonStorage } from "../../lib/json-storage";
import { TParser } from "../../models/Parser/definitions";
import { PARSER_ACTIVITY_FILE_PATH, TParserActivityBody, TParserActivityStore } from "./definitions";

const storage = createJsonStorage<TParserActivityStore>({ filePath: PARSER_ACTIVITY_FILE_PATH, defaultValue: {} });

export function updateParserActivity(body: TParserActivityBody, abortController: AbortController): void {
  storage.update(
    (parsers) =>
      produce(parsers, (draft) => {
        draft[body.parser.id] = { ...body, time: Date.now() };
      }),
    abortController
  );
}

export function clearParsersActivities(ids: TParser["id"][], abortController: AbortController): void {
  storage.update(
    (parsers) =>
      produce(parsers, (draft) => {
        for (const id of ids) {
          draft[id] = undefined;
        }
      }),
    abortController
  );
}

export function clearAllParsersActivities(abortController: AbortController): void {
  storage.reset(abortController);
}

export function getParsersActivities(): TParserActivityStore {
  return storage.get();
}
