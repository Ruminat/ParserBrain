import { clearParsersActivities } from "../../components/ParserActivity";
import { createApiPostController } from "../Common/apiPOST";

export const clearParsersActivitiesPOST = createApiPostController(async (req, res, abortController) => {
  const ids = req.body;
  clearParsersActivities(ids, abortController);

  res.json({ result: "OK" });
});
