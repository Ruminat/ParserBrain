import { Express } from "express";
import { getParserActivity } from "../../components/ParserActivity";

export class GetParsersStatuses {
  public constructor(app: Express, path: string) {
    app.get(path, async (req, res) => {
      try {
        const abortController = new AbortController();

        const activity = await getParserActivity(abortController);

        res.json({ result: activity });
      } catch (error) {
        res.json({ result: "ERROR", error });
      }
    });
  }
}
