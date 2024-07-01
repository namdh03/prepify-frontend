import { GetCategoriesResponse, TableCategoryResponse } from "~types/category.type";
import { TableRequestState } from "~types/table.type";
import http from "~utils/http";

export const GET_CATEGORIES_QUERY_KEY = "GET_CATEGORIES_QUERY_KEY";

export const GET_TABLE_CATEGORIES_QUERY_KEY = "GET_TABLE_CATEGORIES_QUERY_KEY";

export const getCategories = () => http.get<GetCategoriesResponse>("/categories");

export const getTableCategories = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  console.log("getTableCategories", { sorting, columnFilters, pagination });

  return http.get<TableCategoryResponse>("/recipes");
};
