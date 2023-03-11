import { getParsersActivities } from "../../components/ParserActivity";
import { createApiGetController } from "../Common/apiGET";

export const getParsersStatusesGET = createApiGetController(async (req, res) => {
  const activity = getParsersActivities();

  res.json({ result: activity });
});
