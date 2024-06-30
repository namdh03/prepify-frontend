import { CiStopwatch } from "react-icons/ci";

import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "~components/common/DataTableColumnHeader";
import { Avatar, AvatarFallback, AvatarImage } from "~components/ui/avatar";
import { Badge } from "~components/ui/badge";
import { TableRecipeType } from "~types/recipes.type";
import { LevelCook } from "~utils/enums";

import DataTableRowActions from "../components/DataTableRowActions";

export const columns: ColumnDef<TableRecipeType>[] = [
  {
    id: "index",
    header: "STT",
    cell: ({ row }) => <span className="text-[#71717A]">{row.index + 1}</span>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên công thức" />,
    cell: ({ row }) => {
      const title = row.original.name;
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
    meta: {
      title: "Tên công thức",
    },
  },
  {
    accessorKey: "level",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Độ khó" />,
    cell: ({ row }) => {
      const level = row.original.level;
      const levelStyles = {
        [LevelCook.EASY]: "px-5 border-secondary bg-[#CFE4D2]",
        [LevelCook.MEDIUM]: "px-5 border-primary bg-orange-300",
        [LevelCook.HARD]: "px-5 border-destructive bg-red-300",
      };
      const levelText = {
        [LevelCook.EASY]: "Dễ",
        [LevelCook.MEDIUM]: "Trung bình",
        [LevelCook.HARD]: "Khó",
      };

      return (
        <Badge variant="outline" className={levelStyles[level]}>
          {levelText[level]}
        </Badge>
      );
    },
    meta: {
      title: "Độ khó",
    },
  },
  {
    accessorKey: "time",
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
    meta: {
      title: "Thời gian nấu",
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phân loại" />,
    cell: ({ row }) => {
      const category = row.original.category.name;
      return <span className="text-sm font-normal leading-5">{category}</span>;
    },
    meta: {
      title: "Phân loại",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
