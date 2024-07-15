import { IngredientFormType } from "~contexts/ingredient/ingredient.type";
import {
  IngredientDetailResponse,
  IngredientTypeBody,
  TableIngredientFilter,
  TableIngredientResponse,
} from "~types/ingredient.type";
import { IngredientResponse } from "~types/ingredient.type";
import { TableRequestState } from "~types/table.type";
import columnFilterFn from "~utils/columnFilterFn";
import { OrderByEnum } from "~utils/enums";
import http from "~utils/http";

export const GET_INGREDIENTS_QUERY_KEY = "GET_INGREDIENTS_QUERY_KEY";

export const GET_TABLE_INGREDIENTS_QUERY_KEY = "GET_TABLE_INGREDIENTS_QUERY_KEY";

export const GET_TABLE_INGREDIENTS_STALE_TIME = 30 * 1000; // 30s

export const GET_INGREDIENT_DETAIL_QUERY_KEY = "GET_INGREDIENT_DETAIL_QUERY_KEY";

export const getIngredients = () => http.get<IngredientResponse>("/ingredients");

export const getTableIngredients = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  const { name: search } = columnFilterFn<TableIngredientFilter>({ columnFilters });
  const { id: sortBy = "", desc: orderByDesc = false } = sorting[0] || {};
  const orderBy = orderByDesc ? OrderByEnum.DESC : OrderByEnum.ASC;

  return http.get<TableIngredientResponse>("/moderator/ingredients", {
    params: {
      ...(search && { search }),
      ...(sortBy && { sortBy, orderBy }),
      pageIndex: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    },
  });
};

export const createIngredient = (body: IngredientTypeBody) => http.post("/moderator/ingredients", body);

export const getIngredient = (id: string) => http.get<IngredientDetailResponse>(`/moderator/ingredients/${id}`);

export const updateIngredient = (id: string, body: IngredientFormType) =>
  http.put(`/moderator/ingredients/${id}`, body);
