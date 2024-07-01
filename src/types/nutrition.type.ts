import { SuccessResponse } from "./response.type";

export type NutritionType = {
  id: string;
  name: string;
};

export type NutritionResponse = SuccessResponse<NutritionType[]>;
