import { Express } from "express";
import { setUpFrontend } from "./controllers/Frontend";
import { getGlobalSettingsGET, updateGlobalSettingPOST } from "./controllers/GlobalSettings";
import {
  getParsersStatusesGET,
  clearAllParsersActivitiesPOST,
  clearParsersActivitiesPOST,
  sendParserActivityPOST,
  canIUseParserGET,
} from "./controllers/ParsersStatuses";

const PARSER_ROUTES = {
  "/api/clear-all-parsers-activities": clearAllParsersActivitiesPOST,
  "/api/clear-parsers-activities": clearParsersActivitiesPOST,
  "/api/get-parsers-statuses": getParsersStatusesGET,
  "/api/gbpltw": canIUseParserGET,
  "/api/send-parser-activity": sendParserActivityPOST,
};

const GLOBAL_SETTINGS_ROUTES = {
  "/api/get-global-settings": getGlobalSettingsGET,
  "/api/update-global-setting": updateGlobalSettingPOST,
};

const ROUTES = {
  ...PARSER_ROUTES,
  ...GLOBAL_SETTINGS_ROUTES,
};

export function appRoutes(app: Express): void {
  for (const [path, route] of Object.entries(ROUTES)) {
    route(app, path);
  }

  setUpFrontend(app);
}
