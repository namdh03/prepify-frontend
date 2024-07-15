import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { GET_TABLE_INGREDIENTS_QUERY_KEY, getTableIngredients } from "~apis/ingredient.api";
import { TableRequestState } from "~types/table.type";

const useGetTableIngredients = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_TABLE_INGREDIENTS_QUERY_KEY, sorting, columnFilters, pagination],
    queryFn: () =>
      getTableIngredients({
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

export default useGetTableIngredients;
