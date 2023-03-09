import { Express } from "express";
import { GetParsersStatuses } from "./controllers/GetParsersStatuses";
import { SendParserActivity } from "./controllers/SendParserActivity";

export function appRoutes(app: Express): void {
  // GET
  new GetParsersStatuses(app, "/get-parsers-statuses");

  // POST
  new SendParserActivity(app, "/send-parser-activity");
}
