import { getParsersActivities } from "../../components/ParserActivity";
import { createApiGetController } from "../Common/apiGET";

export const getParsersStatusesGET = createApiGetController(async (req, res, abortController) => {
  const activity = await getParsersActivities(abortController);

  res.json({ result: activity });
});
