import { memo, useEffect, useRef, useState } from "react";

import { CellContext } from "@tanstack/react-table";

import InputPositiveNumber from "~components/common/InputPositiveNumber";
import useDebounce from "~hooks/useDebounce";
import { CartItem } from "~types/cart.type";

const MIN_VALUE = 1;
const MAX_VALUE = 99;

const Quantity = memo(({ table, row }: CellContext<CartItem, unknown>) => {
  const [quantityValue, setQuantityValue] = useState<number>();
  const quantityRef = useRef<number>(row.original.quantity);
  const quantityDebounce = useDebounce(quantityValue, 1000);

  useEffect(() => {
    if (quantityDebounce && quantityDebounce !== quantityRef.current) {
      table.options.meta?.updateCartItem({
        ...row.original,
        quantity: quantityDebounce,
      });
      quantityRef.current = quantityDebounce;
    }
  }, [quantityDebounce, row.original, table.options.meta]);

  const handleQuantityChange = (value: number) => setQuantityValue(value);

  return (
    <InputPositiveNumber
      min={MIN_VALUE}
      max={MAX_VALUE}
      value={quantityValue || row.original.quantity}
      placeholder="Số lượng"
      className="max-w-24 ml-auto mr-auto"
      onValueChange={handleQuantityChange}
    />
  );
});

export default Quantity;
