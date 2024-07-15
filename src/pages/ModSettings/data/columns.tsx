import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "~components/common/DataTableColumnHeader";
import { Badge } from "~components/ui/badge";
import { SettingType } from "~types/setting.type";
import { SETTING_TEXT_MAP, SETTING_VALUE_TEXT_MAP } from "~utils/constants";

import DataTableRowActions from "../components/DataTableRowActions";

export const columns: ColumnDef<SettingType>[] = [
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
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phân loại" />,
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <Badge variant={"outline"} className="px-5 text-sm font-normal leading-5">
          {SETTING_TEXT_MAP[type]}
        </Badge>
      );
    },
    meta: {
      title: "Phân loại",
    },
    enableHiding: false,
  },
  {
    accessorKey: "value",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Giá trị" />,
    cell: ({ row }) => {
      const value = row.original.value;
      const type = row.original.type;
      return (
        <span className="text-primary text-sm font-medium leading-5">
          {value} {SETTING_VALUE_TEXT_MAP[type]}
        </span>
      );
    },
    meta: {
      title: "Giá trị",
    },
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
