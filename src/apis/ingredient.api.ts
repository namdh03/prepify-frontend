import { TableIngredientResponse } from "~types/ingredient.type";
import { TableRequestState } from "~types/table.type";
import http from "~utils/http";

export const GET_TABLE_INGREDIENTS_QUERY_KEY = "GET_TABLE_INGREDIENTS_QUERY_KEY";

export const getTableIngredients = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  console.log("getTableIngredients", { sorting, columnFilters, pagination });
  return http.get<TableIngredientResponse>("/recipes");
};
