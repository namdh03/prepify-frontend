import { Dispatch } from "react";
import { z } from "zod";

import { MealKitItem } from "~types/meal-kit.type";

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
  mealKits: MealKitItem[]; // similar mealKits at cart api
};

export type RecipeDetailState = {
  recipe?: RecipeDetailType;
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
