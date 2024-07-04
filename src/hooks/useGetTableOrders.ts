import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { GET_TABLE_ORDER_QUERY_KEY, getTableOrders } from "~apis/order.api";
import { TableRequestState } from "~types/table.type";

const useGetTableOrders = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_TABLE_ORDER_QUERY_KEY, sorting, columnFilters, pagination],
    queryFn: () =>
      getTableOrders({
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

export default useGetTableOrders;
