/* eslint-disable @typescript-eslint/no-var-requires */
import type { Express } from "express";
import express = require("express");
import path = require("path");
import { notEmpty } from "../../common/empty/utils";

const FRONTEND_PATH = process.env.FRONT_END_DIR ?? "../../../parser-brain-ui";
const FRONTEND_PORT = process.env.FRONTEND_PORT;

console.log("  - FRONTEND PATH =", FRONTEND_PATH);
console.log("  - FRONTEND PORT =", FRONTEND_PORT);

const distPath = path.join(FRONTEND_PATH, "dist");
const indexHtmlPath = path.join(distPath, "index.html");

export function setUpFrontend(app: Express) {
  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    if (notEmpty(FRONTEND_PORT)) {
      res.redirect(`http://localhost:${FRONTEND_PORT}`);
    } else {
      res.sendFile(indexHtmlPath);
    }
  });
}
