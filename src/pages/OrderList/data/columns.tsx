import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "~components/common/DataTableColumnHeader";
import { Badge } from "~components/ui/badge";
import { cn } from "~lib/utils";
import { TableOrderType } from "~types/order.type";
import { ORDER_STATUS_TEXT_MAP } from "~utils/constants";
import { OrderStatus } from "~utils/enums";

import DataTableRowActions from "../components/DataTableRowActions";

export const columns: ColumnDef<TableOrderType>[] = [
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
    accessorKey: "trackingNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mã đơn hàng" />,
    cell: ({ row }) => {
      const trackingNumber = row.original.trackingNumber;
      return (
        <Badge variant="outline" className="text-sm font-medium leading-5 px-5">
          {trackingNumber || "Không xác định"}
        </Badge>
      );
    },
    meta: {
      title: "Mã đơn hàng",
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "area",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Khu vực" />,
    cell: ({ row }) => {
      const area = row.original.area;
      return <span className="text-sm font-normal leading-5">{area}</span>;
    },
    meta: {
      title: "Khu vực",
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
    cell: ({ row }) => {
      const status = row.original.status;
      const statusStyles = {
        [OrderStatus.PICKED_UP]: "px-5 border-blue-500 bg-blue-300",
        [OrderStatus.DELIVERING]: "px-5 border-yellow-500 bg-yellow-300",
        [OrderStatus.DELIVERED]: "px-5 border-secondary bg-[#CFE4D2]",
        [OrderStatus.CREATED]: "px-5 border-gray-500 bg-gray-300",
        [OrderStatus.CANCELED]: "px-5 border-destructive bg-red-300",
        [OrderStatus.DELAYED]: "px-5 border-primary bg-orange-300",
      };

      return (
        <Badge variant="outline" className={cn("text-sm font-normal leading-5", statusStyles[status])}>
          {ORDER_STATUS_TEXT_MAP[status] || "Không xác định"}
        </Badge>
      );
    },
    meta: {
      title: "Trạng thái",
    },
  },
  {
    accessorKey: "datetime",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày đặt hàng" />,
    cell: ({ row }) => {
      const datetime = row.original.datetime;
      return <span className="text-sm font-normal leading-5">{datetime}</span>;
    },
    meta: {
      title: "Ngày đặt hàng",
    },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên khách hàng" />,
    cell: ({ row }) => {
      const customer = row.original.customer;
      return <span className="text-sm font-normal leading-5">{customer}</span>;
    },
    meta: {
      title: "Tên khách hàng",
    },
    enableSorting: false,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Số điện thoại" />,
    cell: ({ row }) => {
      const phone = row.original.phone;
      return <span className="text-sm font-normal leading-5">{phone}</span>;
    },
    meta: {
      title: "Số điện thoại",
    },
    enableSorting: false,
  },
  {
    accessorKey: "address",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Địa chỉ" />,
    cell: ({ row }) => {
      const address = row.original.address;
      return <span className="text-sm font-normal leading-5">{address}</span>;
    },
    meta: {
      title: "Địa chỉ",
    },
    enableSorting: false,
  },
  {
    accessorKey: "note",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ghi chú" />,
    cell: ({ row }) => {
      const note = row.original.note;
      return (
        <span className="text-sm font-normal leading-5">
          {note || <i className="text-muted-foreground">Chưa có</i>}
        </span>
      );
    },
    meta: {
      title: "Ghi chú",
    },
    enableSorting: false,
  },
  {
    accessorKey: "totalOrderDetails",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Gói nguyên liệu"
        tooltipMessage="Tổng số gói nguyên liệu trong đơn hàng"
        className="block text-center"
      />
    ),
    cell: ({ row }) => {
      const totalOrderDetails = row.original.totalOrderDetails;
      return <span className="text-sm font-normal leading-5 block text-center">{totalOrderDetails}</span>;
    },
    meta: {
      title: "Gói nguyên liệu",
    },
    enableSorting: false,
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tổng tiền" />,
    cell: ({ row }) => {
      const totalPrice = row.original.totalPrice;
      return (
        <span className="text-sm font-normal leading-5">
          <sup>₫</sup>
          {totalPrice.toLocaleString()}
        </span>
      );
    },
    meta: {
      title: "Tổng tiền",
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
