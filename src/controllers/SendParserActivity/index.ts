import { updateParserActivity } from "../../components/ParserActivity";
import { createApiPostController } from "../Common/apiPOST";

export const sendParserActivityPOST = createApiPostController(async (req, res, abortController) => {
  updateParserActivity(req.body, abortController);

  res.json({ result: "OK" });
});
