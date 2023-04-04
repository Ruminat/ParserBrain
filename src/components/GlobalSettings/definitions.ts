import { getDataDir } from "../../lib/fs/utils";

class GlobalSettings {
  public adminToken?: string = undefined;
  public enableParsersProtection = false;
  public allowedParsersTokens: string[] = [];

  public constructor() {
    return JSON.parse(JSON.stringify(this));
  }
}

export const globalSettings = new GlobalSettings();
export type TGlobalSettings = typeof globalSettings;
export type TGlobalSettingKey = keyof TGlobalSettings;

export const GLOBAL_SETTINGS_FILE_PATH = `${getDataDir()}/global-settings.json`;
