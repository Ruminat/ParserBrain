import { Express } from "express";
import { saveParserActivity } from "../../components/ParserActivity";

export class SendParserActivity {
  public constructor(app: Express, path: string) {
    app.post(path, (req, res) => {
      try {
        const abortController = new AbortController();

        saveParserActivity(req.body, abortController)
          .then(() => {
            res.json({ result: "OK" });
          })
          .catch((error) => {
            res.json({ result: "ERROR", error });
          });
      } catch (error) {
        res.json({ result: "ERROR", error });
      }
    });
  }
}
