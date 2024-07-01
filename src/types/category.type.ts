import { SuccessResponse } from "./response.type";
import { TableResponseState } from "./table.type";

export type CategoryItem = {
  id: string;
  name: string;
};

export type GetCategoriesResponse = SuccessResponse<CategoryItem[]>;

export type TableCategoryType = CategoryItem & {
  totalRecipes: number;
};

export type TableCategoryResponse = TableResponseState<TableCategoryType>;

export type TableCategoryFilter = {
  name: string;
};
