import { TableCategoryFilter } from "~types/category.type";
import { TableRequestState } from "~types/table.type";
import { TableUnitResponse, UnitResponse } from "~types/unit.type";
import columnFilterFn from "~utils/columnFilterFn";
import { OrderByEnum } from "~utils/enums";
import http from "~utils/http";

export const GET_UNITS_QUERY_KEY = "GET_UNITS_QUERY_KEY";

export const GET_TABLE_UNITS_QUERY_KEY = "GET_TABLE_UNITS_QUERY_KEY";

export const GET_TABLE_UNITS_STALE_TIME = 30 * 1000; // 30s

export const getUnits = () => http.get<UnitResponse>("/units");

export const getTableUnits = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  const { name: searchUnit } = columnFilterFn<TableCategoryFilter>({ columnFilters });
  const { id: sortBy = "", desc: orderByDesc = false } = sorting[0] || {};
  const orderBy = orderByDesc ? OrderByEnum.DESC : OrderByEnum.ASC;

  console.log("getTableUnits", {
    ...(searchUnit && { searchUnit }),
    ...(sortBy && { sortBy, orderBy }),
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  });

  return http.get<TableUnitResponse>("recipes");
};
