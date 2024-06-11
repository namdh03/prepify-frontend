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
    cell: ({ table, row }) => {
      const cartItem = row.original;
      const cart = table.getRowModel().rows.map((row) => row.original);
      const mealKitExisted = cart.map((item) => {
        if (item.recipe.id === cartItem.recipe.id && item.mealKitSelected.id !== cartItem.mealKitSelected.id) {
          return item.mealKitSelected.id;
        }
      });

      return (
        <div className="flex items-center">
          <Link to={`${configs.routes.shop}/${cartItem.recipe.slug}`} className="flex items-center">
            <img src={cartItem.image} alt="" className="w-20 h-20 rounded-[5px] object-contain" />
            <h4 className="w-44 ml-[10px] text-sm font-normal leading-5 line-clamp-3 break-keep">
              {cartItem.recipe.name}
            </h4>
          </Link>

          <Servings
            id={cartItem.id}
            selectedId={cartItem.mealKitSelected.id}
            quantity={cartItem.quantity}
            mealKits={cartItem.mealKits}
            mealKitExisted={mealKitExisted}
          />
        </div>
      );
    },
  },
  {
    id: "price",
    header: () => <h3 className="text-center text-base font-medium leading-5">Đơn giá</h3>,
    cell: ({ row }) => {
      const price = row.original.mealKitSelected.price.toLocaleString();

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
      return <Quantity id={row.original.id} defaultValue={String(row.original.quantity)} />;
    },
  },
  {
    id: "totalPrice",
    header: () => <h3 className="text-center text-base font-medium leading-5">Thành tiền</h3>,
    cell: ({ row }) => {
      const totalPrice = (row.original.quantity * row.original.mealKitSelected.price).toLocaleString();

      return (
        <span className="block text-center text-primary text-sm font-normal leading-5">
          <sup>₫</sup>
          {totalPrice}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <h3 className="text-center text-base font-medium leading-5">Thao tác</h3>,
    cell: ({ row }) => {
      return <Bin id={row.original.id} />;
    },
  },
];
