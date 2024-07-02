import { TableMealKitResponse, TableUnitFilter, TableUnitSorting } from "~types/meal-kit.type";
import { TableRequestState } from "~types/table.type";
import columnFilterFn from "~utils/columnFilterFn";
import { OrderByEnum } from "~utils/enums";
import http from "~utils/http";

export const GET_TABLE_MEAL_KITS_QUERY_KEY = "GET_TABLE_MEAL_KITS_QUERY_KEY";

export const getTableMealKits = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  const { name: search = "", status = "" } = columnFilterFn<TableUnitFilter>({ columnFilters });
  const { id: sortBy = "", desc: orderByDesc = false } = sorting[0] || {};
  const orderBy = orderByDesc ? OrderByEnum.DESC : OrderByEnum.ASC;
  const sortByMap = {
    name: "recipename",
    status: "status",
    serving: "serving",
    price: "price",
    extraSpice_name: "extraspicename",
    extraSpice_price: "extraspiceprice",
  };
  const isValidSortBy = (key: string): key is keyof TableUnitSorting => key in sortByMap;

  const params = {
    ...(search && { search }),
    ...(status && { status }),
    ...(sortBy && isValidSortBy(sortBy) && { sortBy: sortByMap[sortBy], orderBy }),
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  };

  return http.get<TableMealKitResponse>("/moderator/mealkits", { params });
};

export const toggleStatusMealKit = (id: string) => http.put(`/moderator/mealkits/${id}/status/toggle`);
