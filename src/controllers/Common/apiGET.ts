import { Express, Request, Response } from "express";
import { adminCheck } from "./adminCheck";
import { goodParserCheck } from "./goodParserCheck";

export function createApiGetController(
  run: (req: Request, res: Response, abortController: AbortController) => Promise<void>,
  params?: { checkForAdmin?: boolean; checkParser?: boolean }
) {
  return async (app: Express, path: string) => {
    if (!path.startsWith("/api/") && path !== "*") {
      throw new Error("Each api controller path must start with `/api/`");
    }

    app.get(path, async (req, res) => {
      try {
        const abortController = new AbortController();

        if (params?.checkForAdmin) {
          adminCheck(getQueryParam(req, "adminToken"));
        }

        if (params?.checkParser) {
          goodParserCheck(getQueryParam(req, "parserToken"));
        }

        await run(req, res, abortController);
      } catch (error) {
        res.json({ result: "ERROR", error: (error as Error)?.message });
      }
    });
  };
}

function getQueryParam(req: Request, param: string): string | undefined {
  return typeof req.query[param] === "string" ? (req.query[param] as string) : undefined;
}
