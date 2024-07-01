import { RxCross2 } from "react-icons/rx";

import { useQuery } from "@tanstack/react-query";
import { Table } from "@tanstack/react-table";

import { GET_CATEGORIES_QUERY_KEY, getCategories } from "~apis/category.api";
import DataTableFacetedFilter from "~components/common/DataTableFacetedFilter";
import DataTableViewOptions from "~components/common/DataTableViewOptions";
import { Input } from "~components/ui/input";
import Button from "~layouts/AdminLayout/components/Button";
import levels from "~pages/RecipeList/data/levels";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const columnName = table.getAllColumns().find((column) => column.id === "name");
  const columnLevel = table.getAllColumns().find((column) => column.id === "level");
  const columnCategory = table.getAllColumns().find((column) => column.id === "category");
  // Get categories
  const { data } = useQuery({
    queryKey: [GET_CATEGORIES_QUERY_KEY],
    queryFn: () => getCategories(),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Tìm kiếm công thức..."
          value={(columnName?.getFilterValue() as string) ?? ""}
          onChange={(event) => columnName?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <div className="flex gap-x-2">
          {columnLevel && <DataTableFacetedFilter column={columnLevel} title="Độ khó" options={levels} />}
          {columnCategory && (
            <DataTableFacetedFilter
              column={columnCategory}
              title="Phân loại"
              options={data?.map((category) => ({ label: category.name, value: category.id })) || []}
            />
          )}
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="flex items-end gap-1 h-8 px-2 lg:px-3"
          >
            Xóa bộ lọc
            <RxCross2 size={16} className="mb-[1px]" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} className="w-60" />
    </div>
  );
}
