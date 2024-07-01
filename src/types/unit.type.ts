import { SuccessResponse } from "./response.type";

export type UnitType = {
  id: string;
  name: string;
};

export type UnitResponse = SuccessResponse<UnitType[]>;
