import { clearAllParsersActivities } from "../../components/ParserActivity";
import { createApiPostController } from "../Common/apiPOST";

export const clearAllParsersActivitiesPOST = createApiPostController(async (req, res, abortController) => {
  await clearAllParsersActivities(abortController);

  res.json({ result: "OK" });
});
