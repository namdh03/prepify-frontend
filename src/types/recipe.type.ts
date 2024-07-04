import { LevelCook } from "~utils/enums";

import { FoodStyleType } from "./food-style.type";
import { MealKitItem } from "./meal-kit.type";
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

export type TableViewRecipeType = {
  foodStyles: FoodStyleType[];
  videoUrl: string;
  images: string[];
  steps: string;
  ingredients: RecipeIngredientType[];
  nutrition: RecipeNutritionType[];
  mealKits: MealKitItem[];
};

export type TableRecipeResponse = TableResponseState<TableRecipeType>;

export type TableRecipeFilter = {
  name: string;
  level: string;
  category: string;
};
