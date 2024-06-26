import { RxCross2 } from "react-icons/rx";

import { Table } from "@tanstack/react-table";

import { Input } from "~components/ui/input";
import Button from "~layouts/AdminLayout/components/Button";

import DataTableViewOptions from "../DataTableViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Tìm kiếm công thức..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {isFiltered && (
          <Button size={"icon"} variant="ghost" onClick={() => table.resetColumnFilters()}>
            <RxCross2 size={16} />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
