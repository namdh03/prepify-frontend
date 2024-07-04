import { SuccessResponse } from "./response.type";

export type Area = {
  id: string;
  name: string;
  instantPrice: number;
  standardPrice: number;
};

export type GetAreasResponse = SuccessResponse<Area[]>;
