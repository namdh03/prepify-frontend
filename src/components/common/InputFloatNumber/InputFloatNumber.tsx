import { ChangeEvent, KeyboardEvent } from "react";

import { Input } from "~components/ui/input";
import inputOnlyFloatNumber from "~utils/inputOnlyFloatNumber";

interface InputFloatNumberProps {
  min?: number;
  max?: number;
  value?: number;
  defaultValue?: number;
  placeholder?: string;
  className?: string;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
}

const InputFloatNumber = ({
  min = 0,
  max = Infinity,
  value,
  defaultValue,
  placeholder,
  className,
  disabled = false,
  onValueChange,
}: InputFloatNumberProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    inputOnlyFloatNumber(e, min, max);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.startsWith("0") && !e.target.value.startsWith("0.")) {
      e.target.value = e.target.value.replace(/^0+/, "");
    }
    const _value = parseFloat(e.target.value);

    if (!isNaN(_value) && _value !== value && onValueChange) {
      onValueChange(_value);
    }
  };

  return (
    <Input
      type="number"
      min={min}
      max={max}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className={className}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      step="any" // Allows input of floating-point numbers
      disabled={disabled}
    />
  );
};

export default InputFloatNumber;
