import { config } from "dotenv";
import { setUpExpressApp } from "./lib/express";
import { appRoutes } from "./routes";
import express = require("express");
import TelegramBot = require("node-telegram-bot-api");
import { telegramOnMessage } from "./telegram/onMessage";

config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const TOKEN = process.env.TELEGRAM_BOT_TOKEN as string;

const TELEGRAM_BOT = new TelegramBot(TOKEN, { polling: true });

const app = express();

setUpExpressApp(app, PORT);
appRoutes(app);

telegramOnMessage(TELEGRAM_BOT);
