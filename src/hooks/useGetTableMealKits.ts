import { useQuery } from "@tanstack/react-query";

import { GET_TABLE_MEAL_KITS_QUERY_KEY, getTableMealKits } from "~apis/meak-kit.api";
import { TableRequestState } from "~types/table.type";

const useGetTableMealKits = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_TABLE_MEAL_KITS_QUERY_KEY, sorting, columnFilters, pagination],
    queryFn: () =>
      getTableMealKits({
        sorting,
        columnFilters,
        pagination,
      }),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading };
};

export default useGetTableMealKits;
