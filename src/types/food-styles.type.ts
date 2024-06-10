import { SuccessResponse } from "./response.type";

export type FoodStyleData = {
  id: string;
  name: string;
  slug: string;
};

export type FoodStyleItem = {
  type: string;
  title: string;
  data: FoodStyleData[];
};

export type FoodStyleResponse = SuccessResponse<FoodStyleItem[]>;
