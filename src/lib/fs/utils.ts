import { writeFile, readFile as fsReadFile, access, constants } from "fs/promises";
import { Buffer } from "buffer";

const fs = require("fs");

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

export function doesFileExist(filePath: string): boolean {
  return fs.existsSync(filePath);
  // return access(filePath, constants.F_OK)
  //   .then(() => true)
  //   .catch(() => false);
}

const dataPath = "./data";
export function getDataDir(): string {
  return dataPath;
}

export async function createDataDirIfDoesntExist() {
  if (fs.existsSync(dataPath)) return;
  fs.mkdirSync(dataPath);
}
