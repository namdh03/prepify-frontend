import { RecipeDetailType } from "~contexts/recipe-detail/recipe-detail.type";
import { LevelCook } from "~utils/enums";

import { MealKit } from "./meal-kit.type";
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
  name: string;
  foodStyles: Record<string, string>;
  videoUrl: string;
  images: string[];
  time: number;
  steps: string;
  category: string;
  ingredients: RecipeIngredientType[];
  nutrition: RecipeNutritionType[];
  mealKits: MealKit[];
};

export type ShopRecipeDetail = {
  id: string;
  name: string;
  slug: string;
  images: string[];
  price: number;
  star: number;
  sold: number;
  totalFeedback: number;
};

export type ShopRecipeDetailResponse = SuccessResponse<TableViewRecipeType>;

export type TableRecipeResponse = TableResponseState<TableRecipeType>;

export type ModRecipeDetailResponse = SuccessResponse<TableViewRecipeType>;

export type CusRecipeDetailResponse = SuccessResponse<RecipeDetailType>;

export type TableRecipeFilter = {
  name: string;
  level: string;
  category: string;
};
