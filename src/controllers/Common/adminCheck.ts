import { getGlobalSetting } from "../../components/GlobalSettings";

function isAdmin(tokenToCheck?: string): boolean {
  const adminToken = getGlobalSetting("adminToken");
  if (!adminToken) return true;
  else return tokenToCheck === adminToken;
}

export function adminCheck(tokenToCheck?: string): void {
  if (!isAdmin(tokenToCheck)) {
    throw new Error("Ты кто такой, Вася?!");
  }
}
