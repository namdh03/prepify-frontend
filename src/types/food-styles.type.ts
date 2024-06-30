import { SuccessResponse } from "./response.type";

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

export type TableFoodStyleType = {
  id: string;
  type: string;
  slug: string;
  title: string;
};
