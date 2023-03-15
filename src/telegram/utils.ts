import TelegramBot from "node-telegram-bot-api";
import { randomFrom } from "../common/random/utils";

export function code(content: string): string {
  return `<code>${content}</code>`;
}

export function b(content: string): string {
  return `<b>${content}</b>`;
}

const RICARDO_STICKERS = [
  "CAACAgIAAxkBAAOXZBIRoGoQCfi7Hs-ZzrixXeaKKOUAAk0AA8XXGRXidaWumvAE-C8E",
  "CAACAgIAAxkBAAOdZBISy-HhGdra_v72UjMjB97Q2mgAAlAAA8XXGRXz_oYf98gHAy8E",
  "CAACAgIAAxkBAAOgZBIS5ks0nnG6WEI6SgSDIT0AARPhAAJMAAPF1xkVHZr3AAE5acDPLwQ",
];
export const sendRicardoSticker = (bot: TelegramBot, chatId: number) =>
  bot.sendSticker(chatId, randomFrom(RICARDO_STICKERS));

const SHREK_STICKERS = [
  "CAACAgIAAxkBAAOjZBITeHZW21J5k5V0yR68GoiFPqMAAjIAA1oMNxVIG42mhTZX-C8E",
  "CAACAgIAAxkBAAOmZBITpOs2UwxQFoJ_24QJ2SZEScAAAhoAA1oMNxU7Qwb0512wsi8E",
  "CAACAgIAAxkBAAOpZBITs643GcLUSXo0i_3qeucDRaoAAjQAA1oMNxVttDFM4v0nei8E",
];
export const sendShrekSticker = (bot: TelegramBot, chatId: number) =>
  bot.sendSticker(chatId, randomFrom(SHREK_STICKERS));
