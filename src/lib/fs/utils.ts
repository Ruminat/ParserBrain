import { Buffer } from "buffer";
import { readFile as fsReadFile, writeFile } from "fs/promises";
import fs = require("fs");

export async function writeToFile(filePath: string, content: string, controller: AbortController) {
  const data = new Uint8Array(Buffer.from(content));
  return writeFile(filePath, data, { signal: controller.signal });
}

export async function readFile(filePath: string, controller: AbortController): Promise<string | undefined> {
  if (!doesFileExist(filePath)) {
    return undefined;
  }

  const buffer = await fsReadFile(filePath, { signal: controller.signal });
  return buffer.toString();
}

export function readFileSync(filePath: string): string | undefined {
  if (!doesFileExist(filePath)) {
    return undefined;
  }

  const buffer = fs.readFileSync(filePath);
  return buffer.toString();
}

export function doesFileExist(filePath: string): boolean {
  return fs.existsSync(filePath);
}

const dataPath = "./data";
export function getDataDir(): string {
  return dataPath;
}

export async function createDataDirIfMissing() {
  if (fs.existsSync(dataPath)) return;
  fs.mkdirSync(dataPath);
}
