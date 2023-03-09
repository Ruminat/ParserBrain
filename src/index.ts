import { setUpExpressApp } from "./lib/express";
import { appRoutes } from "./routes";

const express = require("express");

const PORT = process.env.PORT ?? 3000;

const app = express();

setUpExpressApp(app);
appRoutes(app);

app.listen(PORT, () => {
  console.log(`
    Server running on port ${PORT}
  `);
});
