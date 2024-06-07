import { KeyboardEvent } from "react";

const inputOnlyPositiveNumber = (event: KeyboardEvent<HTMLInputElement>, min: number, max: number) => {
  const filter = ["Backspace", "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Tab"];
  const input = event.currentTarget.value + event.key;

  // Allow only numbers and check if the input is within the min-max range
  if (!/^[0-9]$/.test(event.key) && filter.indexOf(event.key) === -1) {
    event.preventDefault();
  } else if (+input > max) {
    event.preventDefault();
    event.currentTarget.value = String(max);
  } else if (+input < min && input !== "" && !filter.includes(event.key)) {
    event.preventDefault();
  }

  return event;
};

export default inputOnlyPositiveNumber;
