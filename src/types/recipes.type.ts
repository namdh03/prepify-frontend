import { LevelCook } from "~utils/enums";

import { TableFoodStyleType } from "./food-styles.type";
import { SuccessResponse } from "./response.type";
import { TableResponseState } from "./table.type";

export type ShopRecipeType = {
  id: string;
  name: string;
  slug: string;
  foodStyle: string;
  mainImage: string;
  subImage: string;
  level: LevelCook;
  time: number;
  price: number;
  star: number;
  sold: number;
};

export type ShopRecipeResponse = SuccessResponse<{
  recipes: ShopRecipeType[];
  itemTotal: number;
  pageIndex: number;
  pageSize: number;
  pageTotal: number;
}>;

export type RecipeIngredientType = {
  name: string;
  amount: number;
  unit: string;
};

export type RecipeNutritionType = {
  name: string;
  amount: number;
  unit: string;
};

export type TableRecipeType = {
  id: string;
  name: string;
  time: number;
  level: LevelCook;
  category: {
    id: string;
    name: string;
  };
  slug: string;
  image: string;
  totalmealkit: number;
};

export type TableViewRecipeType = TableRecipeType & {
  foodStyles: TableFoodStyleType[];
  videoUrl: string;
  images: string[];
  steps: string;
  ingredients: RecipeIngredientType[];
  nutrition: RecipeNutritionType[];
};

export type TableRecipeResponse = TableResponseState<TableRecipeType>;

export type TableRecipeFilter = {
  name: string;
  level: string;
  category: string;
};
