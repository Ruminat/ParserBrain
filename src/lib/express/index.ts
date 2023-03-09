import { Express } from "express";
import { createDataDirIfDoesntExist } from "../fs/utils";

const bodyParser = require("body-parser");

export function setUpExpressApp(app: Express) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  createDataDirIfDoesntExist();
}
