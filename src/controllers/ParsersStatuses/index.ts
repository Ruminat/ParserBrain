import {
  clearAllParsersActivities,
  clearParsersActivities,
  getParsersActivities,
  updateParserActivity,
} from "../../components/ParserActivity";
import { createApiGetController } from "../Common/apiGET";
import { createApiPostController } from "../Common/apiPOST";

export const sendParserActivityPOST = createApiPostController(
  async (req, res) => {
    updateParserActivity(req.body);
    res.json({ result: "OK" });
  },
  { checkParser: true }
);

export const canIUseParserGET = createApiGetController(
  async (req, res) => {
    res.json({ result: "OK" });
  },
  { checkParser: true }
);

export const clearParsersActivitiesPOST = createApiPostController(
  async (req, res) => {
    clearParsersActivities(req.body);
    res.json({ result: "OK" });
  },
  { checkParser: true }
);

export const getParsersStatusesGET = createApiGetController(
  async (req, res) => {
    const activity = getParsersActivities();
    res.json({ result: activity });
  },
  { checkForAdmin: true }
);

export const clearAllParsersActivitiesPOST = createApiPostController(
  async (req, res) => {
    clearAllParsersActivities();
    res.json({ result: "OK" });
  },
  { checkForAdmin: true }
);
