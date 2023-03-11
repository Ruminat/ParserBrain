import { Express, Request, Response } from "express";

export function createApiGetController(
  run: (req: Request, res: Response, abortController: AbortController) => Promise<void>
) {
  return async (app: Express, path: string) => {
    if (!path.startsWith("/api/")) {
      throw new Error("Each api controller must start with /api/");
    }

    app.get(path, async (req, res) => {
      try {
        const abortController = new AbortController();

        await run(req, res, abortController);
      } catch (error) {
        res.json({ result: "ERROR", error });
      }
    });
  };
}
