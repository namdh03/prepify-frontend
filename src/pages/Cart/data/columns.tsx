import { Link } from "react-router-dom";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "~components/ui/checkbox";
import configs from "~configs";
import { CartItem } from "~types/cart.type";

import Bin from "../components/Bin";
import Quantity from "../components/Quantity";
import Servings from "../components/Servings";

export const columns: ColumnDef<CartItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
  },
  {
    id: "cart-item",
    header: () => <h3 className="text-base font-medium leading-5">Gói nguyên liệu</h3>,
    cell: ({ row }) => {
      const cartItem = row.original;

      return (
        <div className="flex items-center">
          <Link to={`${configs.routes.shop}/${cartItem.slug}`} className="flex items-center">
            <img src={cartItem.image} alt="" className="w-20 h-20 rounded-[5px]" />
            <h4 className="w-44 ml-[10px] text-sm font-normal leading-5 line-clamp-3 break-keep">{cartItem.name}</h4>
          </Link>

          <Servings id={cartItem.id} defaultValue={cartItem.servings} />
        </div>
      );
    },
  },
  {
    id: "price",
    accessorKey: "price",
    header: () => <h3 className="text-center text-base font-medium leading-5">Đơn giá</h3>,
    cell: ({ row }) => {
      const price = Number(row.getValue("price")).toLocaleString();

      return (
        <span className="block text-center text-sm font-normal leading-5">
          <sup>₫</sup>
          {price}
        </span>
      );
    },
  },
  {
    id: "quantity",
    accessorKey: "quantity",
    header: () => <h3 className="text-center text-base font-medium leading-5">Số lượng</h3>,
    cell: ({ row }) => {
      const cartItem = row.original;

      return <Quantity id={cartItem.id} defaultValue={String(cartItem.quantity)} />;
    },
  },
  {
    id: "total",
    accessorKey: "total",
    header: () => <h3 className="text-center text-base font-medium leading-5">Thành tiền</h3>,
    cell: ({ row }) => {
      const total = Number(row.getValue("total")).toLocaleString();

      return (
        <span className="block text-center text-primary text-sm font-normal leading-5">
          <sup>₫</sup>
          {total}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <h3 className="text-center text-base font-medium leading-5">Thao tác</h3>,
    cell: ({ row }) => {
      const cartItem = row.original;

      return <Bin id={cartItem.id} />;
    },
  },
];
