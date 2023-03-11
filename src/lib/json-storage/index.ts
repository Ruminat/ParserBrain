import { throttle } from "lodash";
import { seconds } from "../date/utils";
import { readFileSync, writeToFile } from "../fs/utils";

export function createJsonStorage<T>(params: { filePath: string; defaultValue: T; delay?: number }) {
  const { filePath, defaultValue } = params;

  const savedValue = readFileSync(filePath);
  let currentValue = savedValue ? JSON.parse(savedValue) : defaultValue;

  const get = () => currentValue;

  const actualWrite = throttle(
    (abortController: AbortController) => writeToFile(filePath, JSON.stringify(get()), abortController),
    params.delay ?? seconds(3).toMs()
  );

  const update = (updateFn: (old: T) => T, abortController: AbortController) => {
    currentValue = updateFn(get());
    actualWrite(abortController);
  };

  const reset = (abortController: AbortController) => update(() => defaultValue, abortController);

  return { get, update, reset };
}
