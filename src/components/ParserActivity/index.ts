import produce from "immer";
import { createJsonStorage } from "../../lib/json-storage";
import { TParser } from "../../models/Parser/definitions";
import { PARSER_ACTIVITY_FILE_PATH, TParserActivityBody, TParserActivityStore } from "./definitions";

const storage = createJsonStorage<TParserActivityStore>({ filePath: PARSER_ACTIVITY_FILE_PATH, defaultValue: {} });

export function updateParserActivity(body: TParserActivityBody): void {
  storage.update((parsers) =>
    produce(parsers, (draft) => {
      draft[body.parser.id] = { ...body, time: Date.now() };
    })
  );
}

export function clearParsersActivities(ids: TParser["id"][]): void {
  storage.update((parsers) =>
    produce(parsers, (draft) => {
      for (const id of ids) {
        draft[id] = undefined;
      }
    })
  );
}

export function clearAllParsersActivities(): void {
  storage.reset();
}

export function getParsersActivities(): TParserActivityStore {
  return storage.get();
}
