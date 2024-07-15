import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "~components/common/DataTableColumnHeader";
import { Avatar, AvatarFallback, AvatarImage } from "~components/ui/avatar";
import { Badge } from "~components/ui/badge";
import { cn } from "~lib/utils";
import { TableMealKitType } from "~types/meal-kit.type";
import { MealKitStatus } from "~utils/enums";

import DataTableRowActions from "../components/DataTableRowActions";

export const columns: ColumnDef<TableMealKitType>[] = [
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
      const name = row.original.recipeName;
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
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={"outline"}
          className={cn(
            "text-sm font-normal leading-5",
            status ? "px-5 border-secondary bg-[#CFE4D2]" : "px-5 border-destructive bg-red-300",
          )}
        >
          {status ? MealKitStatus.ACTIVE : MealKitStatus.INACTIVE}
        </Badge>
      );
    },
    meta: {
      title: "Trạng thái",
    },
  },
  {
    accessorKey: "serving",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Khẩu phần ăn" />,
    cell: ({ row }) => {
      const serving = row.original.serving;
      return <span className="text-sm font-normal leading-5">{serving} người ăn</span>;
    },
    meta: {
      title: "Khẩu phần ăn",
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
    accessorKey: "extraSpice.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên gói gia vị" />,
    cell: ({ row }) => {
      const extraSpice = row.original.extraSpice;
      return (
        <span className="text-sm font-normal leading-5">
          {extraSpice?.name || <i className="text-muted-foreground">Chưa có</i>}
        </span>
      );
    },
    meta: {
      title: "Tên gói gia vị",
    },
  },
  {
    accessorKey: "extraSpice.price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Giá gói gia vị" />,
    cell: ({ row }) => {
      const extraSpice = row.original.extraSpice;
      return (
        <span className="text-sm font-normal leading-5">
          {extraSpice?.price ? (
            <>
              <sup>₫</sup>
              {extraSpice?.price.toLocaleString()}
            </>
          ) : (
            <i className="text-muted-foreground">Chưa có</i>
          )}
        </span>
      );
    },
    meta: {
      title: "Giá gói gia vị",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
