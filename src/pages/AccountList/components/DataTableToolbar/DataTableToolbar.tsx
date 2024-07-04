import { RxCross2 } from "react-icons/rx";

import { useQuery } from "@tanstack/react-query";
import { Table } from "@tanstack/react-table";

import { GET_AREAS_QUERY_KEY, GET_AREAS_STALE_TIME, getAreas } from "~apis/area.api";
import DataTableFacetedFilter from "~components/common/DataTableFacetedFilter";
import DataTableViewOptions from "~components/common/DataTableViewOptions";
import { Input } from "~components/ui/input";
import Button from "~layouts/AdminLayout/components/Button";
import roles from "~pages/AccountList/data/role";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const columnName = table.getAllColumns().find((column) => column.id === "name");
  const columnRole = table.getAllColumns().find((column) => column.id === "role");
  const columnArea = table.getAllColumns().find((column) => column.id === "area");
  const { data } = useQuery({
    queryKey: [GET_AREAS_QUERY_KEY],
    queryFn: () => getAreas(),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
    staleTime: GET_AREAS_STALE_TIME,
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Tìm kiếm tài khoản..."
          value={(columnName?.getFilterValue() as string) ?? ""}
          onChange={(event) => columnName?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <div className="flex gap-x-2">
          {columnRole && <DataTableFacetedFilter column={columnRole} title="Vai trò" options={roles} />}
          {columnArea && (
            <DataTableFacetedFilter
              column={columnArea}
              title="Khu vực"
              options={data?.map((area) => ({ value: area.name, label: area.name })) ?? []}
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
      <DataTableViewOptions table={table} className="w-40" />
    </div>
  );
}
