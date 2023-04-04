import { Express } from "express";
import { createDataDirIfMissing } from "../fs/utils";
import bodyParser = require("body-parser");

export function setUpExpressApp(app: Express, port: number): void {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  createDataDirIfMissing();

  app.listen(port, () => {
    console.log(`\n  - The server is running on port ${port}\n`);
  });

  app.listen(3000, () => {
    console.log(`\n  - The server is running on port ${3000}\n`);
  });
}
