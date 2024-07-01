import { Dispatch, SetStateAction, useEffect, useMemo } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  SortingState,
  Table as TableType,
  useReactTable,
} from "@tanstack/react-table";

import { Skeleton } from "~components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~components/ui/table";
import { TableStateData } from "~types/table.type";
import { PAGE, TABLE_LIMIT } from "~utils/constants";

import DataTablePagination from "../DataTablePagination";

export interface TableProps<TData, TValue> {
  isTableDataLoading: boolean;
  paginatedTableData?: TableStateData<TData>;
  columns: ColumnDef<TData, TValue>[];
  pagination?: PaginationState;
  setPagination?: Dispatch<SetStateAction<PaginationState>>;
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  toolbar?: (table: TableType<TData>) => JSX.Element;
}

export default function DataTable<TData, TValue>({
  isTableDataLoading,
  paginatedTableData,
  columns,
  pagination = {
    pageIndex: PAGE - 1,
    pageSize: TABLE_LIMIT,
  },
  sorting = [],
  setSorting,
  setPagination,
  columnFilters = [],
  setColumnFilters,
  toolbar,
}: TableProps<TData, TValue>) {
  const tableData = useMemo(
    () => (isTableDataLoading ? Array(TABLE_LIMIT).fill({}) : paginatedTableData?.data),
    [isTableDataLoading, paginatedTableData?.data],
  );
  const tableColumns = useMemo(
    () =>
      isTableDataLoading
        ? columns.map((column) => ({
            ...column,
            cell: () => <Skeleton className="min-w-12 h-8" />,
          }))
        : columns,
    [columns, isTableDataLoading],
  );
  const table = useReactTable({
    data: tableData || [],
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),

    // sort config
    onSortingChange: setSorting,
    enableMultiSort: true,
    manualSorting: true,
    sortDescFirst: true,

    // filter config
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    manualFiltering: true,

    // pagination config
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    rowCount: paginatedTableData?.itemTotal || 0,
    pageCount: paginatedTableData?.pageTotal || 0,
    manualPagination: true,
    state: {
      sorting,
      pagination,
      columnFilters,
    },
  });

  // to reset page index to first page
  useEffect(() => {
    if (setPagination) {
      setPagination((pagination) => ({
        pageIndex: PAGE - 1,
        pageSize: pagination.pageSize,
      }));
    }
  }, [columnFilters, setPagination]);

  return (
    <div className="space-y-4 no-scrollbar">
      {toolbar && toolbar(table)}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
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
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Không tìm thấy kết quả nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {paginatedTableData && paginatedTableData.pageTotal > 0 && <DataTablePagination table={table} />}
    </div>
  );
}
