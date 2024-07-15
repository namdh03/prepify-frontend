import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "~components/common/DataTableColumnHeader";
import { Avatar, AvatarFallback, AvatarImage } from "~components/ui/avatar";
import { Badge } from "~components/ui/badge";
import { cn } from "~lib/utils";
import { TableAccountType } from "~types/user.type";
import { ACCOUNT_ROLE_TEXT_MAP } from "~utils/constants";
import { Role } from "~utils/enums";

import DataTableRowActions from "../components/DataTableRowActions";

export const columns: ColumnDef<TableAccountType>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Họ và tên" />,
    cell: ({ row }) => {
      const fullname = row.original.fullname;
      const avatar = row.original.avatar;

      return (
        <article className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={avatar} />
            <AvatarFallback>{fullname.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-normal leading-5">{fullname}</span>
        </article>
      );
    },
    meta: {
      title: "Họ và tên",
    },
    enableHiding: false,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vai trò" />,
    cell: ({ row }) => {
      const role = row.original.role;
      const roleStyles = {
        [Role.ADMIN]: "px-5 border-destructive bg-red-300",
        [Role.MODERATOR]: "px-5 border-primary bg-orange-300",
        [Role.CUSTOMER]: "px-5 border-blue-500 bg-blue-300",
        [Role.SHIPPER]: "px-5 border-secondary bg-[#CFE4D2]",
      };

      return (
        <Badge variant="outline" className={cn("text-sm font-normal leading-5", roleStyles[role])}>
          {ACCOUNT_ROLE_TEXT_MAP[role] || "Không xác định"}
        </Badge>
      );
    },
    meta: {
      title: "Vai trò",
    },
    enableSorting: false,
  },
  {
    accessorKey: "area",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Khu vực" />,
    cell: ({ row }) => {
      const area = row.original.area;
      return (
        <span className="text-sm font-normal leading-5">
          {area || <i className="text-muted-foreground">Chưa có</i>}
        </span>
      );
    },
    meta: {
      title: "Khu vực",
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Số điện thoại" />,
    cell: ({ row }) => {
      const phone = row.original.phone;
      return (
        <span className="text-sm font-normal leading-5">
          {phone || <i className="text-muted-foreground">Chưa có</i>}
        </span>
      );
    },
    meta: {
      title: "Số điện thoại",
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      const email = row.original.email;
      return (
        <span className="text-sm font-normal leading-5">
          {email || <i className="text-muted-foreground">Chưa có</i>}
        </span>
      );
    },
    meta: {
      title: "Email",
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Địa chỉ" />,
    cell: ({ row }) => {
      const address = row.original.address;
      return (
        <span className="text-sm font-normal leading-5">
          {address || <i className="text-muted-foreground">Chưa có</i>}
        </span>
      );
    },
    meta: {
      title: "Địa chỉ",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
