import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "~components/common/DataTableColumnHeader";
import { Avatar, AvatarFallback, AvatarImage } from "~components/ui/avatar";
import { TableIngredientType } from "~types/ingredient.type";

import DataTableRowActions from "../components/DataTableRowActions";

export const columns: ColumnDef<TableIngredientType>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên gói nguyên liệu" />,
    cell: ({ row }) => {
      const name = row.original.name;
      const image = row.original.image;

      return (
        <article className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={image} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-normal leading-5">{name}</span>
        </article>
      );
    },
    meta: {
      title: "Tên gói nguyên liệu",
    },
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phân loại" />,
    cell: ({ row }) => {
      const category = row.original.category;
      return <span className="text-sm font-normal leading-5">{category}</span>;
    },
    meta: {
      title: "Phân loại",
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Giá" />,
    cell: ({ row }) => {
      const price = row.original.price;
      return (
        <span className="text-sm font-normal leading-5">
          <sup>₫</sup>
          {price.toLocaleString()}
        </span>
      );
    },
    meta: {
      title: "Giá",
    },
  },
  {
    accessorKey: "unit",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Đơn vị" />,
    cell: ({ row }) => {
      const unit = row.original.unit;
      return <span className="text-sm font-normal leading-5">{unit}</span>;
    },
    meta: {
      title: "Đơn vị",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
