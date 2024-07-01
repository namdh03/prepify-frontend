import { SuccessResponse } from "./response.type";

export type IngredientType = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
};

export type IngredientResponse = SuccessResponse<IngredientType[]>;
