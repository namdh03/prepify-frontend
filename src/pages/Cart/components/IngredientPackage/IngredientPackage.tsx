import { memo } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";
import { CellContext } from "@tanstack/react-table";

import { updateCart } from "~apis/cart.api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~components/ui/select";
import configs from "~configs";
import { CartItem, UpdateCartBody } from "~types/cart.type";
import { SYSTEM_MESSAGES } from "~utils/constants";

const IngredientPackage = memo(({ table, row }: CellContext<CartItem, unknown>) => {
  const cartItem = row.original;
  const mealKitExisted = table.options.data.map((item) => {
    if (item.recipe.id === cartItem.recipe.id && item.mealKitSelected.id !== cartItem.mealKitSelected.id) {
      return item.mealKitSelected.id;
    }
  });
  const { mutate } = useMutation({
    mutationFn: (body: UpdateCartBody) => updateCart(body),
  });

  const handleValueChange = (id: string) => {
    const mealKitSelected = cartItem.mealKits.find((mealKit) => mealKit.id === id) || cartItem.mealKitSelected;
    const isHasExtraSpice = Boolean(cartItem.mealKitSelected.extraSpice);

    mutate(
      {
        cartId: cartItem.id,
        has_extra_spice: isHasExtraSpice,
        mealkitId: mealKitSelected.id,
        quantity: cartItem.quantity,
      },
      {
        onSuccess: () => {
          table.options.meta?.updateCartItem({
            ...row.original,
            mealKitSelected: {
              ...mealKitSelected,
              extraSpice: isHasExtraSpice ? mealKitSelected.extraSpice : null,
            },
          });
        },
        onError: () => {
          table.options.meta?.updateCartItem({
            ...row.original,
          });
          toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
        },
      },
    );
  };

  return (
    <div className="flex items-center">
      <Link to={`${configs.routes.shop}/${cartItem.recipe.slug}`} className="flex items-center gap-[10px]">
        <img src={cartItem.image} alt="" className="w-20 h-20 rounded-[5px] object-contain" />
        <h4 className="w-44 text-sm font-normal leading-5 line-clamp-3 break-keep">{cartItem.recipe.name}</h4>
      </Link>

      <Select value={cartItem.mealKitSelected.id} onValueChange={(value) => handleValueChange(value)}>
        <SelectTrigger className="w-[150px] ml-auto mr-auto">
          <SelectValue placeholder="Khẩu phần ăn" />
        </SelectTrigger>
        <SelectContent>
          {cartItem.mealKits.map((mealKit) => (
            <SelectItem key={mealKit.id} value={mealKit.id} disabled={mealKitExisted.includes(mealKit.id)}>
              {mealKit.serving} người ăn
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});

export default IngredientPackage;
