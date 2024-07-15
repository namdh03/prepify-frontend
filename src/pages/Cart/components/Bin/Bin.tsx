import { memo } from "react";
import { LuTrash } from "react-icons/lu";
import { toast } from "react-toastify";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CellContext } from "@tanstack/react-table";

import { deleteOneCart, GET_CART_LENGTH_QUERY_KEY } from "~apis/cart.api";
import AlertDialog from "~components/common/AlertDialog";
import { Button } from "~components/ui/button";
import { CartItem } from "~types/cart.type";
import { SYSTEM_MESSAGES } from "~utils/constants";

const Bin = memo(({ table, row }: CellContext<CartItem, unknown>) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (cartId: string) => deleteOneCart(cartId),
  });

  const handleDelete = () => {
    mutate(row.original.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_CART_LENGTH_QUERY_KEY] });
        row.toggleSelected(false);
        table.options.meta?.deleteCartItem(row.original.id);
      },
      onError: () => {
        toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
      },
    });
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
