import { useQuery } from "@tanstack/react-query";

import { GET_TABLE_RECIPES_QUERY_KEY, getTableRecipes } from "~apis/recipes.api";
import { TableRequestState } from "~types/table.type";

const useGetTableRecipes = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_TABLE_RECIPES_QUERY_KEY, sorting, columnFilters, pagination],
    queryFn: () =>
      getTableRecipes({
        sorting,
        columnFilters,
        pagination,
      }),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading };
};

export default useGetTableRecipes;
