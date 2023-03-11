import { Express } from "express";
import { clearAllParsersActivitiesPOST } from "./controllers/ClearAllParsersActivities";
import { clearParsersActivitiesPOST } from "./controllers/ClearParsersActivities";
import { getParsersStatusesGET } from "./controllers/GetParsersStatuses";
import { sendParserActivityPOST } from "./controllers/SendParserActivity";

export function appRoutes(app: Express): void {
  // GET
  getParsersStatusesGET(app, "/api/get-parsers-statuses");

  // POST
  clearAllParsersActivitiesPOST(app, "/api/clear-all-parsers-activities");
  clearParsersActivitiesPOST(app, "/api/clear-parsers-activities");
  sendParserActivityPOST(app, "/api/send-parser-activity");
}
