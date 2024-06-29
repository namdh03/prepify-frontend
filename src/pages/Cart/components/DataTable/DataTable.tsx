import { Link } from "react-router-dom";

import { flexRender, Table } from "@tanstack/react-table";

import images from "~assets/imgs";
import { Button } from "~components/ui/button";
import { Collapsible } from "~components/ui/collapsible";
import { Table as TableShadcn, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~components/ui/table";
import configs from "~configs";
import { cn } from "~lib/utils";
import { CartItem } from "~types/cart.type";

import AddMore from "../AddMore";
import Spice from "../Spice";

interface DataTableProps<TData> {
  table: Table<TData>;
  length: number;
}

const DataTable = ({ table, length }: DataTableProps<CartItem>) => {
  return (
    <TableShadcn className="text-[#09090B] bg-white">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="p-4 text-[#09090B]">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => {
            const cartItem = row.original;
            const extraSpiceById = cartItem.mealKits.find(
              (mealKit) => mealKit.id === cartItem.mealKitSelected.id,
            )?.extraSpice;

            return (
              <Collapsible key={row.id} asChild open={row.getIsSelected()}>
                <>
                  {!cartItem.mealKitSelected.extraSpice && extraSpiceById && (
                    <AddMore table={table} row={row} cartItem={cartItem} spice={extraSpiceById} />
                  )}

                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className={cn("data-[state=selected]:bg-white", {
                      "border-none": cartItem.mealKitSelected.extraSpice && row.getIsSelected(),
                    })}
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={cn("px-4 py-5", {
                          "border-b-[1px]": index > 0,
                        })}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>

                  {cartItem.mealKitSelected.extraSpice && (
                    <Spice cartItem={cartItem} updateCartItem={table.options.meta?.updateCartItem} />
                  )}
                </>
              </Collapsible>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={length} className="h-24 text-center">
              <div className="flex flex-col items-center gap-4 my-10">
                <img src={images.cartEmpty} alt="" className="w-28 h-24 object-cover" />
                <span className="text-[rgba(0,0,0,.4)] font-bold">Giỏ hàng của bạn còn trống</span>
                <Link to={configs.routes.shop}>
                  <Button className="uppercase">Mua Ngay</Button>
                </Link>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </TableShadcn>
  );
};

export default DataTable;
