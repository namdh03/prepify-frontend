import { SuccessResponse } from "./response.type";
import { TableResponseState } from "./table.type";

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
};

export type IngredientResponse = SuccessResponse<IngredientType[]>;
