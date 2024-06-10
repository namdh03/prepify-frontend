import { LevelEnum } from "~utils/constants";

import { SuccessResponse } from "./response.type";

export type RecipeType = {
  id: string;
  name: string;
  slug: string;
  foodStyle: string;
  mainImage: string;
  subImage: string;
  level: LevelEnum;
  time: number;
  price: number;
  star: number;
  sold: number;
};

export type ShopRecipeResponse = SuccessResponse<{
  recipes: RecipeType[];
  itemTotal: number;
  pageIndex: number;
  pageSize: number;
  pageTotal: number;
}>;
