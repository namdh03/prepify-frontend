import { QueryFunctionContext } from "@tanstack/react-query";

import {
  CusOrderListResponse,
  ModOrderDetailResponse,
  OrderQueries,
  PostOrderBody,
  TableOrderFilter,
  TableOrderResponse,
} from "~types/order.type";
import { TableRequestState } from "~types/table.type";
import columnFilterFn from "~utils/columnFilterFn";
import { OrderByEnum } from "~utils/enums";
import http from "~utils/http";

export const GET_TABLE_ORDER_QUERY_KEY = "GET_TABLE_ORDER_QUERY_KEY";

export const GET_TABLE_VIEW_ORDER_DETAIL_QUERY_KEY = "GET_TABLE_VIEW_ORDER_DETAIL_QUERY_KEY";

export const GET_LIST_ORDER_BY_STATUS_QUERY_KEY = "GET_LIST_ORDER_BY_STATUS_QUERY_KEY";

export const GET_LIST_ORDER_BY_STATUS_STALE_TIME = 1000 * 30; // 30s

export const postOrder = (body: PostOrderBody) => http.post("/order", body);

export const getTableOrders = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  const { trackingNumber: search, area, status } = columnFilterFn<TableOrderFilter>({ columnFilters });
  const { id: sortBy = "", desc: orderByDesc = false } = sorting[0] || {};
  const orderBy = orderByDesc ? OrderByEnum.DESC : OrderByEnum.ASC;

  const params = {
    ...(search && { search }),
    ...(area && { area }),
    ...(status && { status }),
    ...(sortBy && { sortBy, orderBy }),
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  };

  return http.get<TableOrderResponse>("moderator/orders", { params });
};

export const getModOrderDetails = (id: string) => http.get<ModOrderDetailResponse>(`/moderator/orders/${id}`);

export const getListOrderByStatus = ({ queryKey }: QueryFunctionContext<[string, OrderQueries]>) => {
  const [, queries] = queryKey;

  return http.get<CusOrderListResponse>("orders", {
    params: queries.tab === "ALL" ? {} : { tab: queries.tab },
  });
};
