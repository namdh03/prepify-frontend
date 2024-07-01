import { TableMealKitResponse } from "~types/meal-kit.type";
import { TableRequestState } from "~types/table.type";
import http from "~utils/http";

export const GET_TABLE_MEAL_KITS_QUERY_KEY = "GET_TABLE_MEAL_KITS_QUERY_KEY";

export const getTableMealKits = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  console.log("getTableMealKits", { sorting, columnFilters, pagination });
  return http.get<TableMealKitResponse>("/recipes");
};
