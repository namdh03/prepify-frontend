import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "~components/common/DataTableColumnHeader";
import { Badge } from "~components/ui/badge";
import { TableFoodStyleType } from "~types/food-style.type";

import DataTableRowActions from "../components/DataTableRowActions";

export const columns: ColumnDef<TableFoodStyleType>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên phong cách" />,
    cell: ({ row }) => {
      const name = row.original.name;
      return <span className="text-sm font-normal leading-5">{name}</span>;
    },
    meta: {
      title: "Tên phong cách",
    },
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tiêu đề" />,
    cell: ({ row }) => {
      const title = row.original.title;
      return (
        <Badge variant={"outline"} className="px-5 text-sm font-normal leading-5">
          {title}
        </Badge>
      );
    },
    meta: {
      title: "Tiêu đề",
    },
  },
  {
    accessorKey: "totalRecipes",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Tổng số công thức"
        tooltipMessage="Tổng số công thức đã sử dụng phong cách ẩm thực này"
        className="block text-center"
      />
    ),
    cell: ({ row }) => {
      const totalRecipes = row.original.totalRecipes;
      return <span className="text-sm font-normal leading-5 block text-center">{totalRecipes}</span>;
    },
    meta: {
      title: "Tổng số công thức",
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
