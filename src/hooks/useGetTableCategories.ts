import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { GET_TABLE_CATEGORIES_QUERY_KEY, getTableCategories } from "~apis/category.api";
import { TableRequestState } from "~types/table.type";

const useGetTableCategories = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_TABLE_CATEGORIES_QUERY_KEY, sorting, columnFilters, pagination],
    queryFn: () =>
      getTableCategories({
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

export default useGetTableCategories;
