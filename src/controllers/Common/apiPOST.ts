import { Express, Request, Response } from "express";
import { adminCheck } from "./adminCheck";
import { goodParserCheck } from "./goodParserCheck";

export function createApiPostController(
  run: (req: Request, res: Response, abortController: AbortController) => Promise<void>,
  params?: { checkForAdmin?: boolean; checkParser?: boolean }
) {
  return async (app: Express, path: string) => {
    if (!path.startsWith("/api/")) {
      throw new Error("Each api controller path must start with `/api/`");
    }

    app.post(path, async (req, res) => {
      try {
        const abortController = new AbortController();

        if (params?.checkForAdmin) {
          adminCheck(req.body.adminToken);
        }

        if (params?.checkParser) {
          goodParserCheck(req.body.parserToken);
        }

        await run(req, res, abortController);
      } catch (error) {
        res.json({ result: "ERROR", error: (error as Error)?.message });
      }
    });
  };
}
