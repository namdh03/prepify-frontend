import { CiStopwatch } from "react-icons/ci";

import { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "~components/ui/avatar";
import { Badge } from "~components/ui/badge";
import { LevelEnum } from "~utils/constants";

import DataTableColumnHeader from "../components/DataTableColumnHeader";
import DataTableRowActions from "../components/DataTableRowActions";

import { Recipe } from "./schema";

export const columns: ColumnDef<Recipe>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="STT" />,
    cell: ({ row }) => <span className="text-[#71717A]">{row.index + 1}</span>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên công thức" />,
    cell: ({ row }) => {
      const title = row.original.title;
      const image = row.original.image;

      return (
        <article className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={image} />
            <AvatarFallback>{title.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-normal leading-5">{title}</span>
        </article>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Độ khó",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Độ khó" />,
    cell: ({ row }) => {
      const level = row.original.level;

      switch (level) {
        case LevelEnum.EASY:
          return (
            <Badge variant={"outline"} className="px-5 border-secondary bg-[#CFE4D2]">
              {LevelEnum.EASY}
            </Badge>
          );
        case LevelEnum.MEDIUM:
          return (
            <Badge variant={"outline"} className="px-5 border-primary bg-orange-300">
              {LevelEnum.MEDIUM}
            </Badge>
          );
        case LevelEnum.HARD:
          return (
            <Badge variant={"outline"} className="px-5 border-destructive bg-red-300">
              {LevelEnum.HARD}
            </Badge>
          );
        default:
          return null;
      }
    },
    enableSorting: false,
  },
  {
    accessorKey: "Thời gian nấu",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Thời gian nấu" />,
    cell: ({ row }) => {
      const time = row.original.time;

      return (
        <article className="flex items-center gap-2">
          <CiStopwatch className="w-5 h-5" />
          <span className="text-sm font-normal leading-5">{time} phút</span>
        </article>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "Phân loại",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phân loại" />,
    cell: ({ row }) => {
      const category = row.original.category;
      return <span className="text-sm font-normal leading-5">{category}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "Ẩm thực",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ẩm thực" />,
    cell: ({ row }) => {
      const cuisine = row.original.cuisine;
      return <span className="text-sm font-normal leading-5">{cuisine}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "Chế độ ăn",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Chế độ ăn" />,
    cell: ({ row }) => {
      const diet = row.original.diet;
      return <span className="text-sm font-normal leading-5">{diet}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "Hoàn cảnh",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Hoàn cảnh" />,
    cell: ({ row }) => {
      const occasion = row.original.occasion;
      return <span className="text-sm font-normal leading-5">{occasion}</span>;
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
