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

// import TelegramBot from "node-telegram-bot-api";
// import { config } from "dotenv";
// import { onMessage } from "./listeners/onMessage/index.js";
// import { helloMessage } from "./utils.js";

// config();

// const token = process.env.TELEGRAM_BOT_TOKEN as string;

// const bot = new TelegramBot(token, { polling: true });

// helloMessage();

// onMessage(bot);
