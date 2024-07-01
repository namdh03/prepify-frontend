import {
  CreateCategoryBody,
  GetCategoriesResponse,
  TableCategoryFilter,
  TableCategoryResponse,
} from "~types/category.type";
import { TableRequestState } from "~types/table.type";
import columnFilterFn from "~utils/columnFilterFn";
import { OrderByEnum } from "~utils/enums";
import http from "~utils/http";

export const GET_CATEGORIES_QUERY_KEY = "GET_CATEGORIES_QUERY_KEY";

export const GET_TABLE_CATEGORIES_QUERY_KEY = "GET_TABLE_CATEGORIES_QUERY_KEY";

export const getCategories = () => http.get<GetCategoriesResponse>("/categories");

export const getTableCategories = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  const { name: searchCategory } = columnFilterFn<TableCategoryFilter>({ columnFilters });
  const { id: sortBy = "", desc: orderByDesc = false } = sorting[0] || {};
  const orderBy = orderByDesc ? OrderByEnum.DESC : OrderByEnum.ASC;

  return http.get<TableCategoryResponse>("/moderator/categories", {
    params: {
      ...(searchCategory && { searchCategory }),
      ...(sortBy && { sortBy, orderBy }),
      pageIndex: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    },
  });
};

export const createCategory = (body: CreateCategoryBody) => http.post("/moderator/categories", body);
