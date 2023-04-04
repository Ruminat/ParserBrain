import produce from "immer";
import { createJsonStorage } from "../../lib/json-storage";
import { globalSettings, GLOBAL_SETTINGS_FILE_PATH, TGlobalSettingKey, TGlobalSettings } from "./definitions";

const storage = createJsonStorage<TGlobalSettings>({
  filePath: GLOBAL_SETTINGS_FILE_PATH,
  defaultValue: globalSettings,
});

export function updateGlobalSetting<TKey extends TGlobalSettingKey>(params: {
  key: TKey;
  value: TGlobalSettings[TKey];
}): void {
  storage.update((settings) =>
    produce(settings, (draft) => {
      draft[params.key] = params.value;
    })
  );
}

export function getGlobalSettings(): TGlobalSettings {
  return storage.get();
}

export function getGlobalSetting<TKey extends TGlobalSettingKey>(key: TKey): TGlobalSettings[TKey] {
  return storage.get()[key];
}
