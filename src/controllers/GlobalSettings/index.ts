import { getGlobalSettings, updateGlobalSetting } from "../../components/GlobalSettings";
import { createApiGetController } from "../Common/apiGET";
import { createApiPostController } from "../Common/apiPOST";

export const getGlobalSettingsGET = createApiGetController(
  async (req, res) => {
    const settings = getGlobalSettings();
    res.json({ result: settings });
  },
  { checkForAdmin: true }
);

export const updateGlobalSettingPOST = createApiPostController(
  async (req, res) => {
    updateGlobalSetting(req.body);
    res.json({ result: "OK" });
  },
  { checkForAdmin: true }
);
