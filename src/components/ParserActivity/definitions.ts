import { minutes } from "../../lib/date/utils";
import { getDataDir } from "../../lib/fs/utils";
import { TParser } from "../../models/Parser/definitions";

export type TParserAction = "started-posting" | "downloaded-images" | "parsed-tags" | "uploaded-post" | "finished";

export type TParserActivityBody = {
  parser: TParser;
  action: TParserAction;
};

export type TParserActivity = TParserActivityBody & { time: number };

export type TParserActivityStore = Record<TParser["id"], TParserActivity | undefined>;

export const PARSER_ACTIVITY_FILE_PATH = `${getDataDir()}/parsers-activity.json`;

export const TIME_AS_CHERT = minutes(5).toMs();
