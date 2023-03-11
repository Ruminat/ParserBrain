import { throttle } from "lodash";
import { seconds } from "../date/utils";
import { readFileSync, writeToFile } from "../fs/utils";

export function createJsonStorage<T>(params: { filePath: string; defaultValue: T; delay?: number }) {
  const { filePath, defaultValue } = params;

  const savedValue = readFileSync(filePath);
  let currentValue = savedValue ? JSON.parse(savedValue) : defaultValue;

  const actualWrite = throttle(
    async (content: string, abortController: AbortController) => writeToFile(filePath, content, abortController),
    params.delay ?? seconds(3).toMs()
  );

  return {
    get: () => currentValue,

    reset: async (abortController: AbortController) => {
      currentValue = defaultValue;
      await actualWrite(JSON.stringify(currentValue), abortController);
    },

    update: async (updateFn: (old: T) => T, abortController: AbortController) => {
      currentValue = updateFn(currentValue);
      await actualWrite(JSON.stringify(currentValue), abortController);
    },
  };
}
