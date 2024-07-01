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
