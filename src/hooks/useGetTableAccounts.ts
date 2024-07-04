import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { GET_TABLE_ACCOUNTS_QUERY_KEY, getTableAccounts } from "~apis/account.api";
import { TableRequestState } from "~types/table.type";

const useGetTableAccounts = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_TABLE_ACCOUNTS_QUERY_KEY, sorting, columnFilters, pagination],
    queryFn: () =>
      getTableAccounts({
        sorting,
        columnFilters,
        pagination,
      }),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  return { data, isLoading };
};

export default useGetTableAccounts;
