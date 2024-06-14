import { memo } from "react";
import { LuTrash } from "react-icons/lu";
import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";

import { updateCart, UpdateCartBody } from "~apis/cart.api";
import AlertDialog from "~components/common/AlertDialog";
import { Button } from "~components/ui/button";
import { CollapsibleContent } from "~components/ui/collapsible";
import { TableCell, TableRow } from "~components/ui/table";
import { CartItem } from "~types/cart.type";
import { SYSTEM_MESSAGES } from "~utils/constants";

interface SpiceProps {
  cartItem: CartItem;
  updateCartItem?: (cartItem: CartItem) => void;
}

const Spice = memo(({ cartItem, updateCartItem }: SpiceProps) => {
  const spice = cartItem.mealKitSelected.extraSpice;
  const { mutate } = useMutation({
    mutationFn: (body: UpdateCartBody) => updateCart(body),
  });

  const handleDelete = () => {
    mutate(
      {
        cartId: cartItem.id,
        has_extra_spice: false,
        mealkitId: cartItem.mealKitSelected.id,
        quantity: cartItem.quantity,
      },
      {
        onSuccess: () => {
          updateCartItem?.({
            ...cartItem,
            mealKitSelected: {
              ...cartItem.mealKitSelected,
              extraSpice: null,
            },
          });
        },
        onError: () => {
          updateCartItem?.({
            ...cartItem,
          });
          toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
        },
      },
    );
  };

  return (
    <CollapsibleContent asChild>
      <TableRow className="text-center [&>*]:px-4 [&>*]:py-5">
        <TableCell colSpan={2} className="text-left">
          <article className="ml-32">
            <section className="flex items-center gap-[10px]">
              <img src={spice?.image} alt="" className="w-12 h-w-12 rounded-[5px] object-contain" />
              <h5 className="w-44 text-sm font-normal leading-5 line-clamp-3 break-keep">{spice?.name}</h5>
            </section>
          </article>
        </TableCell>
        <TableCell>
          <span className="block text-center text-sm font-normal leading-5">
            <sup>₫</sup>
            {spice?.price.toLocaleString()}
          </span>
        </TableCell>
        <TableCell>1</TableCell>
        <TableCell>
          <span className="block text-center text-primary text-sm font-normal leading-5">
            <sup>₫</sup>
            {spice?.price.toLocaleString()}
          </span>
        </TableCell>
        <TableCell>
          <AlertDialog
            trigger={
              <Button variant={"ghost"} size={"icon"}>
                <LuTrash size={20} />
              </Button>
            }
            title="Bạn có muốn bỏ gói gia vị này?"
            cancelText="TRỞ LẠI"
            actionText="CÓ"
            onAction={handleDelete}
            reverse
            className="[&_h2]:font-normal"
          />
        </TableCell>
      </TableRow>
    </CollapsibleContent>
  );
});

export default Spice;
