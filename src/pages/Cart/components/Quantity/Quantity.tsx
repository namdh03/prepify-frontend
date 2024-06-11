import { FocusEvent, KeyboardEvent, memo, useEffect, useState } from "react";

import { Input } from "~components/ui/input";
import useDebounce from "~hooks/useDebounce";
import inputOnlyPositiveNumber from "~utils/inputOnlyPositiveNumber";

interface QuantityProps {
  id: string;
  defaultValue?: string;
}

const MIN_VALUE = 1;
const MAX_VALUE = 99;

const Quantity = memo(({ id, defaultValue }: QuantityProps) => {
  const [quantityValue, setQuantityValue] = useState<number>();
  const quantityDebounce = useDebounce(quantityValue, 1000);

  useEffect(() => {
    if (quantityDebounce && quantityDebounce >= MIN_VALUE && quantityDebounce <= MAX_VALUE) {
      console.log(`Quantity of ${id} is ${quantityDebounce}`);
    }
  }, [id, quantityDebounce]);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (Number(e.currentTarget.value) < MIN_VALUE) {
      e.target.value = String(MIN_VALUE);
      setQuantityValue(MIN_VALUE);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const _e = inputOnlyPositiveNumber(e, 1, 99);
    setQuantityValue(Number(_e.currentTarget.value));
  };

  const handleValueChange = (value: string) => setQuantityValue(Number(value));

  return (
    <Input
      type="number"
      min={1}
      max={99}
      defaultValue={defaultValue}
      placeholder="Số lượng"
      className="max-w-24 ml-auto mr-auto"
      onKeyDown={(e) => handleKeyDown(e)}
      onBlur={(e) => handleBlur(e)}
      onChange={(e) => handleValueChange(e.target.value)}
    />
  );
});

export default Quantity;
