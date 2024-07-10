import { AccountFormType } from "~contexts/account/account.type";
import { TableRequestState } from "~types/table.type";
import { CreateAccountResponse, TableAccountFilter, TableAccountResponse } from "~types/user.type";
import columnFilterFn from "~utils/columnFilterFn";
import { OrderByEnum } from "~utils/enums";
import http from "~utils/http";

export const GET_TABLE_ACCOUNTS_QUERY_KEY = "GET_TABLE_ACCOUNTS_QUERY_KEY";

export const getTableAccounts = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  const { name: search = "", role = "", area = "" } = columnFilterFn<TableAccountFilter>({ columnFilters });
  const { id: sortBy = "", desc: orderByDesc = false } = sorting[0] || {};
  const orderBy = orderByDesc ? OrderByEnum.DESC : OrderByEnum.ASC;

  const params = {
    ...(search && { search }),
    ...(role && { role }),
    ...(area && { area }),
    ...(sortBy && { sortBy, orderBy }),
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  };

  return http.get<TableAccountResponse>("/admin/accounts", { params });
};

export const createAccount = (body: AccountFormType) => http.post<CreateAccountResponse>("/admin/accounts", body);
