import { Dispatch } from "react";
import { z } from "zod";

import { CategoryItem } from "~types/category.type";
import { FoodStyleType } from "~types/food-style.type";
import { IngredientType } from "~types/ingredient.type";
import { MealKitItem } from "~types/meal-kit.type";
import { NutritionType } from "~types/nutrition.type";
import { LevelCook } from "~utils/enums";

import { recipeDetailSchema } from "./recipe-detail.schema";

export enum RecipeDetailActionType {
  SET_RECIPE = "SET_RECIPE",
}

export type RecipeDetailType = {
  id: string;
  slug: string;
  name: string;
  star: number;
  sold: number;
  totalFeedback: number;
  images: string[];
  level: LevelCook;
  time: number;
  steps: string;
  videoUrl: string;
  category: CategoryItem;
  mealKits: MealKitItem[]; // similar mealKits at cart api
};

export type RecipeDetailState = {
  recipe?: RecipeDetailType;
  foodStyles?: FoodStyleType[];
  ingredients?: IngredientType[];
  nutritions?: NutritionType[];
};

export interface PayloadAction<T> {
  type: RecipeDetailActionType;
  payload: T;
}

export interface RecipeDetailContextType extends RecipeDetailState {
  dispatch: Dispatch<PayloadAction<RecipeDetailState>>;
}

export interface ReducerHandler {
  SET_RECIPE(state: RecipeDetailState, action: PayloadAction<RecipeDetailState>): RecipeDetailState;
}

export type RecipeDetailFormType = z.infer<typeof recipeDetailSchema>;
