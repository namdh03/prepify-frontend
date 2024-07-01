import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "~components/common/DataTableColumnHeader";
import { TableCategoryType } from "~types/category.type";

import DataTableRowActions from "../components/DataTableRowActions";

export const columns: ColumnDef<TableCategoryType>[] = [
  {
    id: "index",
    header: "STT",
    cell: ({ table, row }) => (
      <span className="text-[#71717A]">
        {row.index + table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
      </span>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên phân loại" />,
    cell: ({ row }) => {
      const name = row.original.name;
      return <span className="text-sm font-normal leading-5">{name}</span>;
    },
    meta: {
      title: "Tên phân loại",
    },
    enableHiding: false,
  },
  {
    accessorKey: "totalRecipes",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tổng số công thức" />,
    cell: ({ row }) => {
      const total = row.original.totalRecipes;
      return <span className="text-sm font-normal leading-5 block ml-6">{total || 0} công thức</span>;
    },
    meta: {
      title: "Tổng số công thức",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
