import {
  CreateFoodStyleBody,
  ShopFoodStyleResponse,
  TableFoodStyleFilter,
  TableFoodStyleResponse,
} from "~types/food-style.type";
import { TableRequestState } from "~types/table.type";
import columnFilterFn from "~utils/columnFilterFn";
import { OrderByEnum } from "~utils/enums";
import http from "~utils/http";

export const GET_FOOD_STYLES_QUERY_KEY = "GET_FOOD_STYLES_QUERY_KEY";

export const GET_TABLE_FOOD_STYLES_QUERY_KEY = "GET_TABLE_FOOD_STYLES_QUERY_KEY";

export const GET_FOOD_STYLES_STALE_TIME = 30 * 1000; // 30s

export const getFoodStyles = () => http.get<ShopFoodStyleResponse>("/food-styles");

export const getTableFoodStyles = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  const { name: search = "", title: type = "" } = columnFilterFn<TableFoodStyleFilter>({ columnFilters });
  const { id: sortBy = "", desc: orderByDesc = false } = sorting[0] || {};
  const orderBy = orderByDesc ? OrderByEnum.DESC : OrderByEnum.ASC;

  const params = {
    ...(search && { search }),
    ...(type && { type }),
    ...(sortBy && { sortBy, orderBy }),
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  };

  return http.get<TableFoodStyleResponse>("/moderator/food-styles", { params });
};

export const createFoodStyle = (body: CreateFoodStyleBody) => http.post("/moderator/food-styles", body);

export const updateFoodStyle = (id: string, body: CreateFoodStyleBody) =>
  http.put(`/moderator/food-styles/${id}`, body);

export const deleteFoodStyle = (id: string) => http.delete(`/moderator/food-styles/${id}`);
