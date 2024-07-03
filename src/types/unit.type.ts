import { UnitEnum } from "~utils/enums";

import { SuccessResponse } from "./response.type";
import { TableResponseState } from "./table.type";

export type UnitType = {
  id: string;
  name: string;
};

export type UnitResponse = SuccessResponse<UnitType[]>;

export type TableUnitType = {
  id: string;
  name: string;
  totalIngredients: number;
  totalRecipeIngredients: number;
  totalRecipeNutritions: number;
  type: UnitEnum;
};

export type TableUnitResponse = TableResponseState<TableUnitType>;

export type TableUnitFilter = {
  name: string;
};

export type CreateUnitBody = {
  name: string;
  type: string;
};
