import { memo } from "react";
import { LuTrash } from "react-icons/lu";

import { CellContext } from "@tanstack/react-table";

import AlertDialog from "~components/common/AlertDialog";
import { Button } from "~components/ui/button";
import { CartItem } from "~types/cart.type";

const Bin = memo(({ table, row }: CellContext<CartItem, unknown>) => {
  const handleDelete = () => {
    row.toggleSelected(false);
    table.options.meta?.deleteCartItem(row.original.id);
  };

  return (
    <AlertDialog
      trigger={
        <Button variant={"ghost"} size={"icon"} className="relative left-1/2 -translate-x-1/2">
          <LuTrash size={20} />
        </Button>
      }
      title="Bạn có muốn bỏ sản phẩm này?"
      cancelText="TRỞ LẠI"
      actionText="CÓ"
      onAction={handleDelete}
      reverse
      className="[&_h2]:font-normal"
    />
  );
});

export default Bin;
