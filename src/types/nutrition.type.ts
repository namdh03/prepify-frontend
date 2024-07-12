import { SuccessResponse } from "./response.type";
import { UnitType } from "./unit.type";

export type NutritionType = {
  id: string;
  name: string;
  units: UnitType;
  amount: number;
};

export type NutritionResponse = SuccessResponse<NutritionType[]>;
