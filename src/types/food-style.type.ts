import { SuccessResponse } from "./response.type";
import { TableResponseState } from "./table.type";

export type ShopFoodStyleData = {
  id: string;
  name: string;
  slug: string;
};

export type ShopFoodStyleItem = {
  type: string;
  title: string;
  data: ShopFoodStyleData[];
};

export type ShopFoodStyleResponse = SuccessResponse<ShopFoodStyleItem[]>;

export type FoodStyleType = {
  id: string;
  type: string;
  slug: string;
  title: string;
  name: string;
};

export type TableFoodStyleType = {
  id: string;
  title: string;
  name: string;
  type: string;
  totalRecipes: number;
};

export type TableFoodStyleResponse = TableResponseState<TableFoodStyleType>;

export type TableFoodStyleFilter = {
  name: string;
  title: string;
};

export type CreateFoodStyleBody = {
  title: string;
  name: string;
};

export type UpdateFoodStyleBody = CreateFoodStyleBody;
