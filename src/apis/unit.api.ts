import { TableRequestState } from "~types/table.type";
import { CreateUnitBody, TableUnitFilter, TableUnitResponse, UnitResponse, UpdateUnitBody } from "~types/unit.type";
import columnFilterFn from "~utils/columnFilterFn";
import { OrderByEnum } from "~utils/enums";
import http from "~utils/http";

export const GET_UNITS_QUERY_KEY = "GET_UNITS_QUERY_KEY";

export const GET_TABLE_UNITS_QUERY_KEY = "GET_TABLE_UNITS_QUERY_KEY";

export const GET_TABLE_UNITS_STALE_TIME = 30 * 1000; // 30s

export const getUnits = () => http.get<UnitResponse>("/units");

export const getTableUnits = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  const { name: searchUnit } = columnFilterFn<TableUnitFilter>({ columnFilters });
  const { id: sortBy = "", desc: orderByDesc = false } = sorting[0] || {};
  const orderBy = orderByDesc ? OrderByEnum.DESC : OrderByEnum.ASC;

  return http.get<TableUnitResponse>("/moderator/units", {
    params: {
      ...(searchUnit && { searchUnit }),
      ...(sortBy && { sortBy, orderBy }),
      pageIndex: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    },
  });
};

export const createUnit = (body: CreateUnitBody) => http.post("/moderator/units", body);

export const updateUnit = (id: string, body: UpdateUnitBody) => http.put(`/moderator/units/${id}`, body);
