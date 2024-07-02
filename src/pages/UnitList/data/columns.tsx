import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "~components/common/DataTableColumnHeader";
import { TableUnitType } from "~types/unit.type";

import DataTableRowActions from "../components/DataTableRowActions";

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
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
