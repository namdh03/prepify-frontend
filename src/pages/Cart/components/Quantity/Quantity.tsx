import { memo, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";
import { CellContext } from "@tanstack/react-table";

import { updateCart } from "~apis/cart.api";
import InputPositiveNumber from "~components/common/InputPositiveNumber";
import useDebounce from "~hooks/useDebounce";
import { CartItem, UpdateCartBody } from "~types/cart.type";
import { DEFAULT_DEBOUNCE_TIME, SYSTEM_MESSAGES } from "~utils/constants";
import isAxiosError from "~utils/isAxiosError";

const MIN_VALUE = 1;
const MAX_VALUE = 99;

const Quantity = memo(({ table, row }: CellContext<CartItem, unknown>) => {
  const cartItem = row.original;
  const [quantityValue, setQuantityValue] = useState<number>();
  const quantityRef = useRef<number>(cartItem.quantity);
  const quantityDebounce = useDebounce(quantityValue, DEFAULT_DEBOUNCE_TIME);
  const { mutate } = useMutation({
    mutationFn: (body: UpdateCartBody) => updateCart(body),
  });

  useEffect(() => {
    if (quantityDebounce && quantityDebounce !== quantityRef.current) {
      mutate(
        {
          cartId: cartItem.id,
          has_extra_spice: Boolean(cartItem.mealKitSelected.extraSpice),
          mealkitId: cartItem.mealKitSelected.id,
          quantity: quantityDebounce,
        },
        {
          onSuccess: () => {
            table.options.meta?.updateCartItem({
              ...row.original,
              quantity: quantityDebounce,
            });
            quantityRef.current = quantityDebounce;
          },
          onError: (error) => {
            if (isAxiosError<Error>(error)) {
              toast.error(error.response?.data.message);
            } else {
              toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
            }

            quantityRef.current = cartItem.quantity;
            setQuantityValue(cartItem.quantity);
          },
        },
      );
    }
  }, [
    cartItem.id,
    cartItem.mealKitSelected.extraSpice,
    cartItem.mealKitSelected.id,
    cartItem.quantity,
    mutate,
    quantityDebounce,
    row.original,
    table.options.meta,
  ]);

  const handleQuantityChange = (value: number) => setQuantityValue(value);

  return (
    <InputPositiveNumber
      min={MIN_VALUE}
      max={MAX_VALUE}
      value={quantityValue || cartItem.quantity}
      placeholder="Số lượng"
      className="max-w-24 ml-auto mr-auto"
      onValueChange={handleQuantityChange}
    />
  );
});

export default Quantity;
