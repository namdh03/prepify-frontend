import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "~components/common/DataTableColumnHeader";
import { Badge } from "~components/ui/badge";
import { TableUnitType } from "~types/unit.type";
import { UnitEnum } from "~utils/enums";

import DataTableRowActions from "../components/DataTableRowActions";

import badges from "./badges";

export const columns: ColumnDef<TableUnitType>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên đơn vị" />,
    cell: ({ row }) => {
      const name = row.original.name;
      return <span className="text-sm font-normal leading-5">{name}</span>;
    },
    meta: {
      title: "Tên đơn vị",
    },
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phân loại" />,
    cell: ({ row }) => {
      const type = row.original.type;
      const config = badges[type] || badges.default;

      if (type === UnitEnum.ALL) return config;
      if (typeof config === "object" && "text" in config) {
        return (
          <Badge variant="outline" className={config.className}>
            {config.text}
          </Badge>
        );
      }

      return null;
    },
    meta: {
      title: "Phân loại",
    },
    enableSorting: false,
  },
  {
    accessorKey: "totalIngredients",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Nguyên liệu"
        tooltipMessage="Tổng số nguyên liệu đã dùng đơn vị này"
        className="block text-center"
      />
    ),
    cell: ({ row }) => {
      const totalIngredient = row.original.totalIngredients;
      return <span className="text-sm font-normal leading-5 block text-center">{totalIngredient}</span>;
    },
    meta: {
      title: "Nguyên liệu",
    },
    enableSorting: false,
  },
  {
    accessorKey: "totalRecipeIngredients",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Công thức có nguyên liệu"
        tooltipMessage="Tổng số công thức có nguyên liệu đã sử dụng đơn vị này"
        className="block text-center"
      />
    ),
    cell: ({ row }) => {
      const totalRecipeIngredient = row.original.totalRecipeIngredients;
      return <span className="text-sm font-normal leading-5 block text-center">{totalRecipeIngredient}</span>;
    },
    meta: {
      title: "Công thức có nguyên liệu",
    },
    enableSorting: false,
  },
  {
    accessorKey: "totalRecipeNutritions",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Công thức có chất dinh dưỡng"
        tooltipMessage="Tổng số công thức có chất dinh dưỡng đã sử dụng đơn vị này"
        className="block text-center"
      />
    ),
    cell: ({ row }) => {
      const totalRecipeNutrition = row.original.totalRecipeNutritions;
      return <span className="text-sm font-normal leading-5 block text-center">{totalRecipeNutrition}</span>;
    },
    meta: {
      title: "Công thức có chất dinh dưỡng",
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
