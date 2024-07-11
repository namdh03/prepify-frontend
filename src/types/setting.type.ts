import { ConfigEnum } from "~utils/enums";

import { SuccessResponse } from "./response.type";

export type SettingType = {
  id: string;
  type: ConfigEnum;
  value: number;
};

export type SettingListResponse = SuccessResponse<SettingType[]>;
