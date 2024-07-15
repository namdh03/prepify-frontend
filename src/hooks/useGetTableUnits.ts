import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { GET_TABLE_UNITS_QUERY_KEY, getTableUnits } from "~apis/unit.api";
import { TableRequestState } from "~types/table.type";

const useGetTableUnits = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_TABLE_UNITS_QUERY_KEY, sorting, columnFilters, pagination],
    queryFn: () =>
      getTableUnits({
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

export default useGetTableUnits;
