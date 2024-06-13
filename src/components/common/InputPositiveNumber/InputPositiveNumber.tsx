import { ChangeEvent, KeyboardEvent } from "react";

import { Input } from "~components/ui/input";
import inputOnlyPositiveNumber from "~utils/inputOnlyPositiveNumber";

interface InputPositiveNumberProps {
  min?: number;
  max?: number;
  value?: number;
  defaultValue?: number;
  placeholder?: string;
  className?: string;
  onValueChange?: (value: number) => void;
}

const InputPositiveNumber = ({
  min = 1,
  max = Infinity,
  value,
  defaultValue,
  placeholder,
  className,
  onValueChange,
}: InputPositiveNumberProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const _e = inputOnlyPositiveNumber(e, min, max);
    const _value = Number(_e.currentTarget.value);
    _value !== value && onValueChange && onValueChange(Number(_value));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.startsWith("0")) {
      e.target.value = e.target.value.replace(/^0+/, "");
    }
    const _value = Number(e.target.value);
    _value !== value && onValueChange && onValueChange(_value || min);
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
    />
  );
};

export default InputPositiveNumber;
