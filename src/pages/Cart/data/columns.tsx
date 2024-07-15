import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "~components/ui/checkbox";
import { CartItem } from "~types/cart.type";

import Bin from "../components/Bin";
import IngredientPackage from "../components/IngredientPackage";
import Quantity from "../components/Quantity";

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
    cell: IngredientPackage,
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
    cell: Quantity,
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
    cell: Bin,
  },
];
