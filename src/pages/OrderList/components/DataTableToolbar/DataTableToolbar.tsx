import { RxCross2 } from "react-icons/rx";

import { useQuery } from "@tanstack/react-query";
import { Table } from "@tanstack/react-table";

import { GET_AREAS_QUERY_KEY, GET_AREAS_STALE_TIME, getAreas } from "~apis/area.api";
import DataTableFacetedFilter from "~components/common/DataTableFacetedFilter";
import DataTableViewOptions from "~components/common/DataTableViewOptions";
import { Input } from "~components/ui/input";
import Button from "~layouts/AdminLayout/components/Button";
import status from "~pages/OrderList/data/status";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const columnTrackingNumber = table.getAllColumns().find((column) => column.id === "trackingNumber");
  const columnArea = table.getAllColumns().find((column) => column.id === "area");
  const columnStatus = table.getAllColumns().find((column) => column.id === "status");
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
          placeholder="Tìm kiếm mã đơn hàng..."
          value={(columnTrackingNumber?.getFilterValue() as string) ?? ""}
          onChange={(event) => columnTrackingNumber?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <div className="flex gap-x-2">
          {columnArea && (
            <DataTableFacetedFilter
              column={columnArea}
              title="Khu vực"
              options={data?.map((area) => ({ value: area.name, label: area.name })) ?? []}
            />
          )}

          {columnStatus && <DataTableFacetedFilter column={columnStatus} title="Trạng thái" options={status} />}
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
