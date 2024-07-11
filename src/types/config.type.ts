import { SuccessResponse } from "./response.type";

export type ConfigItem = {
  id: string;
  type: string;
  value: number;
};

export type ConfigResponse = SuccessResponse<ConfigItem[]>;
