import { flexRender, Table } from "@tanstack/react-table";

import { Collapsible } from "~components/ui/collapsible";
import { Table as TableShadcn, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~components/ui/table";
import { cn } from "~lib/utils";
import { CartItem } from "~types/cart.type";

import Spice from "../Spice";

interface DataTableProps<TData> {
  table: Table<TData>;
  length: number;
}

const DataTable = ({ table, length }: DataTableProps<CartItem>) => {
  return (
    <TableShadcn className="text-[#09090B] bg-white">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="p-4 text-[#09090B]">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <Collapsible key={row.id} asChild open={row.getIsSelected()}>
              <>
                <TableRow
                  data-state={row.getIsSelected() && "selected"}
                  className={cn("data-[state=selected]:bg-white", {
                    "border-none": row.original.mealKitSelected.extraSpice && row.getIsSelected(),
                  })}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={cn("p-4", {
                        "border-b-[1px]": index > 0,
                      })}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>

                {row.original.mealKitSelected.extraSpice && <Spice spice={row.original.mealKitSelected.extraSpice} />}
              </>
            </Collapsible>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={length} className="h-24 text-center">
              Không tìm thấy sản phẩm.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </TableShadcn>
  );
};

export default DataTable;
