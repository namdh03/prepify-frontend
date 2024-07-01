import { SuccessResponse } from "./response.type";

export type CategoryItem = {
  id: string;
  name: string;
};

export type GetCategoriesResponse = SuccessResponse<CategoryItem[]>;
