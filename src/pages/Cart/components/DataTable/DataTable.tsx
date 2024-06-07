import { flexRender, Table } from "@tanstack/react-table";

import { Table as TableShadcn, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~components/ui/table";

interface DataTableProps<TData> {
  table: Table<TData>;
  length: number;
}

const DataTable = <TData,>({ table, length }: DataTableProps<TData>) => {
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
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="data-[state=selected]:bg-white"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="p-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </TableShadcn>
  );
};

export default DataTable;
