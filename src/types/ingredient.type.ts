import { SuccessResponse } from "./response.type";
import { TableResponseState } from "./table.type";
import { UnitType } from "./unit.type";

export type TableIngredientType = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  unit: string;
};

export type TableIngredientResponse = TableResponseState<TableIngredientType>;

export type IngredientType = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  unit: UnitType;
  imageURL: string;
};

export type IngredientTypeBody = {
  name: string;
  category: string;
  price: number;
  unit: string;
  imageURL: string;
};

export type IngredientDetailResponse = SuccessResponse<IngredientType>;
export type IngredientResponse = SuccessResponse<IngredientType[]>;

export type TableIngredientFilter = {
  name: string;
};

export type RestrictIngredientType = {
  id: string;
  ingredient: Omit<IngredientType, "unit">;
};
