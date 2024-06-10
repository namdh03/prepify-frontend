import { ShopFormType } from "~contexts/shop/shop.type";

import { SuccessResponse } from "./response.type";

export type FoodStyleData = {
  id: string;
  name: string;
  slug: string;
};

export type FoodStyleItem = {
  type: keyof ShopFormType["sidebar"];
  title: string;
  data: FoodStyleData[];
};

export type FoodStyleResponse = SuccessResponse<FoodStyleItem[]>;
