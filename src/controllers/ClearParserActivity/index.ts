import { Express } from "express";
import { saveParserActivity } from "../../components/ParserActivity";

export class SendParserActivity {
  public constructor(app: Express, path: string) {
    app.post(path, async (req, res) => {
      try {
        const abortController = new AbortController();

        await saveParserActivity(req.body, abortController);

        res.json({ result: "OK" });
      } catch (error) {
        res.json({ result: "ERROR", error });
      }
    });
  }
}
