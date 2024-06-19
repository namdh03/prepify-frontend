import { MealKitItem } from "./meal-kit.type";
import { SuccessResponse } from "./response.type";

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

export type UpdateCartBody = {
  cartId: string;
  has_extra_spice: boolean;
  mealkitId: string;
  quantity: number;
};

export type DeleteCartBody = {
  cartIds: string[];
};

export type AddToCartBody = {
  has_extra_spice: boolean;
  mealkitId: string;
  quantity: number;
};

export type CheckoutBody = {
  cartIds: string[];
};
