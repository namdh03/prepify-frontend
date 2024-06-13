import { SuccessResponse } from "./response.type";

export type ExtraSpice = {
  id: string;
  name: string;
  image: string;
  price: number;
};

export type MealKitItem = {
  id: string;
  price: number;
  serving: number;
  extraSpice: ExtraSpice | null;
};

export type RecipeItem = {
  id: string;
  name: string;
  slug: string;
};

export interface CartItem {
  id: string;
  recipe: RecipeItem;
  mealKitSelected: MealKitItem;
  quantity: number;
  image: string;
  mealKits: MealKitItem[];
}

export type CartResponse = SuccessResponse<CartItem[]>;
