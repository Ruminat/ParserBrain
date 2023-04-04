import { notEmptyArray } from "../../common/empty/utils";
import { getGlobalSetting } from "../../components/GlobalSettings";

function isGoodParser(tokenToCheck?: string): boolean {
  const enableParsersProtection = getGlobalSetting("enableParsersProtection");
  if (!enableParsersProtection) return true;

  if (!tokenToCheck) return false;

  const allowedParsersTokens = getGlobalSetting("allowedParsersTokens");
  if (notEmptyArray(allowedParsersTokens)) {
    return allowedParsersTokens.includes(tokenToCheck);
  } else {
    return true;
  }
}

export function goodParserCheck(tokenToCheck?: string): void {
  if (!isGoodParser(tokenToCheck)) {
    // DON'T CHANGE THE MESSAGE
    throw new Error("Знай своё место, пёс!");
  }
}
