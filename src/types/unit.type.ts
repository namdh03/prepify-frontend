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
  totalIngredient: number;
};

export type TableUnitResponse = TableResponseState<TableUnitType>;
