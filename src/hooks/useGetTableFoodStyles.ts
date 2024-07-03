import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { GET_TABLE_FOOD_STYLES_QUERY_KEY, getTableFoodStyles } from "~apis/food-style.api";
import { TableRequestState } from "~types/table.type";

const useGetTableFoodStyles = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_TABLE_FOOD_STYLES_QUERY_KEY, sorting, columnFilters, pagination],
    queryFn: () =>
      getTableFoodStyles({
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

export default useGetTableFoodStyles;
