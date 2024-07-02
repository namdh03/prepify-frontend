import { TableIngredientResponse } from "~types/ingredient.type";
import { IngredientResponse } from "~types/ingredient.type";
import { TableRequestState } from "~types/table.type";
import http from "~utils/http";

export const GET_INGREDIENTS_QUERY_KEY = "GET_INGREDIENTS_QUERY_KEY";

export const GET_TABLE_INGREDIENTS_QUERY_KEY = "GET_TABLE_INGREDIENTS_QUERY_KEY";

export const GET_TABLE_INGREDIENTS_STALE_TIME = 30 * 1000; // 30s

export const getIngredients = () => http.get<IngredientResponse>("/ingredients");

export const getTableIngredients = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  console.log("getTableIngredients", { sorting, columnFilters, pagination });
  return http.get<TableIngredientResponse>("/recipes");
};
