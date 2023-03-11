import { getParserActivity } from "../../components/ParserActivity";
import { createApiGetController } from "../Common/apiGET";

export const getParsersStatusesGET = createApiGetController(async (req, res, abortController) => {
  const activity = await getParserActivity(abortController);

  res.json({ result: activity });
});
